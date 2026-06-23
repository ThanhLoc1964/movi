import Link from "next/link";

export default function MovieCard({ movie }: { movie: any }) {
  return (
    <div className="relative flex-none w-[140px] md:w-[280px] h-[210px] md:h-[160px] rounded overflow-hidden group cursor-pointer transition-all duration-300 md:hover:scale-110 md:hover:z-20 origin-center bg-secondary-bg">
      <img src={movie.thumb_url || movie.poster_url} alt={movie.name} className="w-full h-full object-cover" loading="lazy" />
      <Link href={`/movie/${movie.slug}`} className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-semibold text-sm truncate">{movie.name}</h3>
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-300 mt-1">
            <span className="text-green-500 font-medium">{movie.quality || "HD"}</span>
            <span>{movie.language || "Vietsub"}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}