"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Card from "@/components/Card";
import ReactPlayer from "react-player/youtube";

export default function MoviePage() {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        const [movieRes, videosRes, relatedRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`),
          fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`),
          fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`),
        ]);

        const movieData = await movieRes.json();
        const videosData = await videosRes.json();
        const relatedData = await relatedRes.json();

        setMovie(movieData);

        const trailers = videosData.results.filter((video) => video.type === "Trailer");
        setTrailerKey(trailers.length > 0 ? trailers[0].key : null);

        setRelatedMovies(relatedData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (movieId) {
      fetchData();
    }
  }, [movieId]);

  if (!movie) {
    return (
      <div className="w-full text-center py-16">
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto'></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="p-6 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-8 mb-12">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
            width={500}
            height={300}
            className="rounded-2xl shadow-2xl w-full"
            style={{ maxWidth: "100%", height: "auto" }}
            alt={movie.title || movie.name}
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl mb-4 font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            {movie.title || movie.name}
          </h1>
          <p className="text-base md:text-lg mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            {movie.overview}
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <span className="font-semibold text-blue-500 mr-2">Release Date:</span>
              <span className="text-gray-700 dark:text-gray-300">{movie.release_date || movie.first_air_date}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-blue-500 mr-2">Rating:</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-lg font-bold">
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className="ml-2 text-gray-600 dark:text-gray-400">({movie.vote_count} votes)</span>
            </div>
            {movie.genres && (
              <div className="flex items-center flex-wrap gap-2">
                <span className="font-semibold text-blue-500 mr-2">Genres:</span>
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {trailerKey && (
            <button
              onClick={() => setShowTrailer(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 w-full md:w-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Trailer
            </button>
          )}
        </div>
      </div>

      {showTrailer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="w-full max-w-5xl relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white text-xl bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 flex items-center gap-2 transition-colors duration-200 font-semibold z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </button>
            <div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-500">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailerKey}`}
                playing
                controls
                width="100%"
                height="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto p-6 mt-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          You May Also Like
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedMovies.map((movie) => (
            <Card key={movie.id} result={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
