import { fetchMovieDetail, fetchMovies } from "@/lib/api";
import Link from "next/link";
import { Play, Plus, ThumbsUp } from "lucide-react";
import MovieCarousel from "@/components/MovieCarousel";

export default async function MovieDetail({ params }: { params: { slug: string } }) {
  const data = await fetchMovieDetail(params.slug);
  const similarData = await fetchMovies('/films/phim-moi-cap-nhat', 1);

  if (!data || data.status !== "success") return <div className="pt-24 px-8 text-center">Movie not found</div>;

  const movie = data.movie;

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <div className="absolute inset-0">
          <img src={movie.poster_url || movie.thumb_url} alt={movie.name} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative h-full flex flex-col justify-end px-4 md:px-12 pb-12 w-full md:w-3/4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{movie.name}</h1>
          <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 mb-6 font-medium">
            <span className="text-green-500">{movie.quality}</span>
            <span>{movie.language}</span>
            {movie.current_episode && <span>{movie.current_episode}</span>}
          </div>

          <div className="flex items-center gap-4">
            <Link href={`/watch/${movie.slug}`} className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-white/80 transition">
              <Play fill="currentColor" size={24} /> Play
            </Link>
            <button className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-400 bg-black/50 hover:border-white transition text-white">
              <Plus size={24} />
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-400 bg-black/50 hover:border-white transition text-white">
              <ThumbsUp size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 -mt-4 relative z-10">
        <div className="md:col-span-2 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>{movie.description || "Đang cập nhật..."}</p>
        </div>
        <div className="text-sm text-gray-400 flex flex-col gap-3">
          <p><span className="text-gray-500">Tên gốc:</span> {movie.original_name}</p>
          <p><span className="text-gray-500">Tập:</span> {movie.total_episodes}</p>
        </div>
      </div>

      <div className="mt-16">
        <MovieCarousel title="Similar Content" movies={similarData?.items || []} />
      </div>
    </div>
  );
}