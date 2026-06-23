"use client";
import { useRef } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MovieCarousel({ title, movies }: { title: string; movies: any[] }) {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-4 md:px-12 relative group">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white/90 group-hover:text-white transition">{title}</h2>
      <div className="relative">
        <button className="absolute left-0 top-0 bottom-0 w-12 bg-black/50 z-10 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-black/80" onClick={() => handleScroll("left")}>
          <ChevronLeft size={32} />
        </button>
        <div ref={rowRef} className="flex gap-2 overflow-x-scroll no-scrollbar scroll-smooth">
          {movies.map((movie) => (
            <MovieCard key={movie.id || movie.slug} movie={movie} />
          ))}
        </div>
        <button className="absolute right-0 top-0 bottom-0 w-12 bg-black/50 z-10 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-black/80" onClick={() => handleScroll("right")}>
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}