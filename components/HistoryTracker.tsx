"use client";
import { useEffect } from "react";

export default function HistoryTracker({ movie, episode }: { movie: any, episode: any }) {
  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem("watchHistory") || "[]");
      // Xóa phần tử cũ nếu đã tồn tại phim này trong lịch sử để đưa nó lên đầu
      const filtered = history.filter((h: any) => h.movie.slug !== movie.slug);
      // Thêm phim đang xem lên đầu mảng
      filtered.unshift({
        movie: {
          name: movie.name,
          slug: movie.slug,
          thumb_url: movie.poster_url || movie.thumb_url, // Lấy ảnh bìa
        },
        episode: {
          name: episode.name,
          slug: episode.slug,
        },
        timestamp: Date.now()
      });
      // Lưu lại tối đa 20 phim gần nhất
      localStorage.setItem("watchHistory", JSON.stringify(filtered.slice(0, 20)));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  }, [movie, episode]);

  return null;
}