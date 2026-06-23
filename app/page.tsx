import HeroBanner from "@/components/HeroBanner";
import MovieCarousel from "@/components/MovieCarousel";
import ContinueWatching from "@/components/ContinueWatching";
import { fetchMovies } from "@/lib/api";

export default async function Home() {
  const newMoviesData = await fetchMovies('/films/phim-moi-cap-nhat', 1);
  const actionMoviesData = await fetchMovies('/films/the-loai/hanh-dong', 1);
  const trendingData = await fetchMovies('/films/danh-sach/phim-dang-chieu', 1);

  const featuredMovie = trendingData?.items?.[0] || newMoviesData?.items?.[0];

  return (
    <div className="min-h-screen">
      {featuredMovie && <HeroBanner movie={featuredMovie} />}

      <div className="pb-20 md:-mt-32 relative z-10 flex flex-col gap-8">
        <ContinueWatching />
        <MovieCarousel title="Trending Now" movies={trendingData?.items || []} />
        <MovieCarousel title="New Releases" movies={newMoviesData?.items || []} />
        <MovieCarousel title="Action Movies" movies={actionMoviesData?.items || []} />
      </div>
    </div>
  );
}