"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, User, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-[#141414] shadow-md" : "bg-gradient-to-b from-black/80 to-transparent"}`}>
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-primary font-bold text-2xl tracking-wider">NETFLIX</Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
            <Link href="/" className="hover:text-text-primary transition">Home</Link>
            <Link href="/" className="hover:text-text-primary transition">Movies</Link>
            <Link href="/" className="hover:text-text-primary transition">TV Shows</Link>
            <Link href="/" className="hover:text-text-primary transition">My List</Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-black/40 border border-gray-600 rounded px-3 py-1 focus-within:border-white transition">
            <Search size={18} className="text-text-secondary" />
            <input type="text" placeholder="Titles, people, genres" className="bg-transparent border-none outline-none text-sm text-white px-2 w-48 placeholder-gray-400" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </form>
          <button className="hidden md:block text-text-secondary hover:text-white transition"><Bell size={20} /></button>
          <Link href="/" className="hidden md:block text-text-secondary hover:text-white transition"><User size={20} /></Link>
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#141414] absolute top-full left-0 w-full p-4 flex flex-col gap-4 border-t border-gray-800 shadow-xl">
          <form onSubmit={handleSearch} className="flex items-center bg-secondary-bg rounded px-3 py-2">
            <Search size={18} className="text-text-secondary" />
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm text-white px-2 w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </form>
          <Link href="/" className="text-white py-2" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <div className="flex items-center gap-4 py-2 border-t border-gray-800 mt-2">
            <Link href="/" className="text-white flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}><User size={20} /> Profile</Link>
          </div>
        </div>
      )}
    </header>
  );
}