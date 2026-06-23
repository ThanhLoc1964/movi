"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export default function ContinueWatching() {
  const [history, setHistory] = useState<any[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("watchHistory") || "[]");
      setHistory(saved);
    } catch (e) {}
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (history.length === 0) return null;

  return (
    <div className="px-4 md:px-12 relative group mt-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white/90 group-hover:text-white transition">Tiếp tục xem</h2>
      <div className="relative">
        <button className="absolute left-0 top-0 bottom-0 w-12 bg-black/50 z-10 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-black/80" onClick={() => handleScroll("left")}>
          <ChevronLeft size={32} />
        </button>
        <div ref={rowRef} className="flex gap-2 overflow-x-scroll no-scrollbar scroll-smooth">
          {history.map((item, i) => (
            <div key={i} className="relative flex-none w-[140px] md:w-[280px] h-[210px] md:h-[160px] rounded overflow-hidden group/card cursor-pointer transition-all duration-300 md:hover:scale-105 md:hover:z-20 origin-center bg-secondary-bg">
              <img src={item.movie.thumb_url} alt={item.movie.name} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/60 transition-colors duration-300"></div>

              <Link href={`/watch/${item.movie.slug}?ep=${item.episode.slug}`} className="absolute inset-0 z-10 flex flex-col justify-center items-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-black/50 text-white">
                  <Play fill="currentColor" size={24} className="ml-1" />
                </div>
              </Link>

              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-white font-semibold text-sm truncate">{item.movie.name}</h3>
                <div className="text-xs text-primary font-medium mt-1">Đang xem Tập {item.episode.name}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="absolute right-0 top-0 bottom-0 w-12 bg-black/50 z-10 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-black/80" onClick={() => handleScroll("right")}>
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}