import { fetchMovieDetail } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HistoryTracker from "@/components/HistoryTracker";

export default async function WatchMovie({ params, searchParams }: { params: { slug: string }, searchParams: { ep?: string } }) {
  const data = await fetchMovieDetail(params.slug);
  if (!data || data.status !== "success") return <div className="pt-24 px-8 text-center text-white">Movie not found</div>;

  const movie = data.movie;
  const episodesList = movie.episodes?.[0]?.items || [];
  const currentEpSlug = searchParams.ep || episodesList[0]?.slug;
  const currentEp = episodesList.find((e: any) => e.slug === currentEpSlug) || episodesList[0];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Component client xử lý lưu localStorage ngầm */}
      <HistoryTracker movie={movie} episode={currentEp} />

      <div className="p-4 flex items-center gap-4 bg-gradient-to-b from-black/80 to-transparent fixed top-0 w-full z-50 transition-opacity hover:opacity-100 opacity-0 md:opacity-100">
        <Link href={`/movie/${movie.slug}`} className="text-white hover:text-gray-300 transition">
          <ArrowLeft size={32} />
        </Link>
        <h1 className="text-white text-xl font-medium">{movie.name} - Tập {currentEp?.name}</h1>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row mt-16 md:mt-0">
        <div className="flex-1 relative bg-black flex items-center justify-center">
          {currentEp?.embed ? (
            <iframe 
               src={currentEp.embed} 
               className="w-full h-[30vh] md:h-[60vh] lg:h-full lg:absolute lg:inset-0" 
               allowFullScreen 
               title={movie.name}
            ></iframe>
          ) : (
            <div className="text-white">Video not available</div>
          )}
        </div>

        <div className="w-full lg:w-80 bg-secondary-bg flex flex-col border-l border-gray-800 lg:h-screen lg:pt-20">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Episodes</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            {episodesList.map((ep: any) => (
              <Link key={ep.slug} href={`/watch/${movie.slug}?ep=${ep.slug}`} className={`p-3 rounded transition flex justify-between items-center ${currentEpSlug === ep.slug ? "bg-gray-800 text-white" : "bg-transparent text-gray-400 hover:bg-gray-800/50"}`}>
                <span>Tập {ep.name}</span>
                {currentEpSlug === ep.slug && <span className="text-xs text-primary font-medium">Đang phát</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}