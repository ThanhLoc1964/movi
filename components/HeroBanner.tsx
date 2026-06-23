import Link from "next/link";
import { Play, Info } from "lucide-react";

export default function HeroBanner({ movie }: { movie: any }) {
  const backgroundUrl = movie.poster_url || movie.thumb_url;

  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <img src={backgroundUrl} alt={movie.name} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
      </div>

      <div className="relative h-full flex flex-col justify-center px-4 md:px-12 w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">{movie.name}</h1>
        <p className="text-sm md:text-base text-gray-300 mb-8 line-clamp-3 md:line-clamp-4 drop-shadow-md">
          {movie.description || movie.original_name || "Mô tả đang cập nhật..."}
        </p>

        <div className="flex items-center gap-4">
          <Link href={`/watch/${movie.slug}`} className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded hover:bg-white/80 transition font-semibold">
            <Play fill="currentColor" size={20} /> Play
          </Link>
          <Link href={`/movie/${movie.slug}`} className="flex items-center gap-2 bg-gray-500/50 text-white px-6 py-2.5 rounded hover:bg-gray-500/70 transition font-semibold">
            <Info size={20} /> More Info
          </Link>
        </div>
      </div>
    </div>
  );
}