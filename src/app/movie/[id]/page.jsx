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
    return <div className="w-full text-center py-8">Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
          width={500}
          height={300}
          className="rounded-lg"
          style={{ maxWidth: "100%", height: "auto" }}
          alt={movie.title || movie.name}
        />
        <div className="p-2 flex-1">
          <h2 className="text-lg mb-3 font-bold">{movie.title || movie.name}</h2>
          <p className="text-lg mb-3">{movie.overview}</p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {movie.release_date || movie.first_air_date}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating:</span>
            {movie.vote_average} ({movie.vote_count} votes)
          </p>

          {trailerKey && (
            <button
              onClick={() => setShowTrailer(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Show Trailer
            </button>
          )}
        </div>
      </div>

      {/* Trailer Modal with react-player */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl relative">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 text-white text-3xl bg-black bg-opacity-60 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-90"
            >
              &times;
            </button>
            <div className="relative w-full pt-[56.25%]">
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

      {/* Related Movies Section */}
      <div className="max-w-6xl mx-auto p-4">
        <h3 className="text-xl font-bold mb-4">Related Movies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedMovies.map((movie) => (
            <Card key={movie.id} result={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
