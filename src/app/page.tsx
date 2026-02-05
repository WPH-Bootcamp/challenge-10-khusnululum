"use client";

import { useEffect, useState } from "react";
import { getRecommendedPosts, getMostLikedPosts } from "@/lib/api";
import RecommendList from "@/components/home/RecommendList";
import MostLikedList from "@/components/home/MostLikedList";

export default function HomePage() {
  const [recommended, setRecommended] = useState<any>(null);
  const [mostLiked, setMostLiked] = useState<any>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getRecommendedPosts(page).then(setRecommended);
    getMostLikedPosts().then(setMostLiked);
  }, [page]);

  if (!recommended || !mostLiked) {
    return (
      <p className="p-4 text-sm text-gray-500 max-w-360 mx-auto">Loading...</p>
    );
  }

  return (
    <main className="max-w-360 mx-auto">
      {/* GRID DESKTOP - MOBILE FLEX*/}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1.3fr] gap-8">
        {/* LEFT : RECOMMEND */}
        <section>
          <div className="min-w-0">
            <RecommendList
              posts={recommended.data}
              page={page}
              lastPage={recommended.lastPage}
              onPageChange={setPage}
            />
          </div>
        </section>

        {/* RIGHT : MOST LIKED */}
        <div className="min-w-0">
          <MostLikedList posts={mostLiked.data} />
        </div>
      </div>
    </main>
  );
}
