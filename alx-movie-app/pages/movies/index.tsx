import { useCallback, useEffect, useState } from "react";
import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";

interface MProps {
  movies: MoviesProps[];
}

const Movies: React.FC<MProps> = () => {
  const [page, setPage] = useState<number>(1);
  const [year, setYear] = useState<number | null>(null);
  const [genre, setGenre] = useState<string>("All");
  const [movies, setMovies] = useState<MoviesProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    const response = await fetch("/api/fetch-movies", {
      method: "POST",
      body: JSON.stringify({
        page,
        year,
        genre: genre === "All" ? "" : genre,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    setMovies(data.movies);
    setLoading(false);
  }, [page, year, genre]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 sm:px-6 md:px-10 lg:px-24 xl:px-44">
      <div className="py-16">
        {/* Search and Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="border-2 border-[#E2D609] bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400 w-full outline-none"
          />

          <select
            onChange={(e) => setYear(Number(e.target.value))}
            className="border-2 border-[#E2D609] bg-transparent px-4 py-2 rounded-full text-white w-full outline-none"
          >
            <option value="">Select Year</option>
            {[2024, 2023, 2022, 2021, 2020, 2019].map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Genre Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left">
            {year || "All"} {genre} Movies
          </h1>

          <div className="flex flex-wrap gap-2 justify-center md:justify-end mt-4 md:mt-0">
            {["All", "Animation", "Comedy", "Fantasy"].map((g, key) => (
              <button
                key={key}
                onClick={() => setGenre(g)}
                className={`px-4 py-2 rounded-full ${
                  genre === g ? "bg-yellow-500" : "bg-blue-600"
                } text-white hover:opacity-80 transition`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-[#E2D609] text-lg mb-6 text-center md:text-left">
          Online streaming
        </p>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-10">
          {movies?.map((movie, key) => (
            <MovieCard
              key={key}
              title={movie?.titleText.text}
              posterImage={movie?.primaryImage?.url}
              releaseYear={movie?.releaseYear.year}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center md:justify-end gap-4 mt-8">
          <Button
            title="Previous"
            action={() => setPage((prev) => Math.max(prev - 1, 1))}
          />
          <Button title="Next" action={() => setPage(page + 1)} />
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && <Loading />}
    </div>
  );
};

export default Movies;
