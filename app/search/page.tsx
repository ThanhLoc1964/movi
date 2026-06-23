import { searchMovies } from "@/lib/api";
import MovieCard from "@/components/MovieCard";

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  let searchResults = [];

  if (query) {
    const data = await searchMovies(query);
    searchResults = data?.items || [];
  }

  return (
    <div className="min-h-screen pt-24 px-4 md:px-12 pb-12">
      <h1 className="text-2xl font-medium text-white mb-8">
        {query ? `Search results for "${query}"` : "Search for movies and TV shows"}
      </h1>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {searchResults.map((movie: any) => (
            <div key={movie.id || movie.slug} className="w-full h-auto flex flex-col pb-6">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : query ? (
        <div className="text-gray-400">No results found for "{query}". Try another keyword.</div>
      ) : null}
    </div>
  );
}