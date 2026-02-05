"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { searchPosts } from "@/lib/api";
import RecommendCard from "@/components/home/RecommendCard";

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q") || "";

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    searchPosts(query).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, [query]);

  return (
    <main className="px-4 pt-4 pb-20 max-w-360 mx-auto">
      <h1 className="font-semibold text-lg mb-4">Search: "{query}"</h1>

      {loading && <p className="text-sm text-gray-500">Searching...</p>}

      {!loading && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10">
          <img src="/empty.svg" alt="Empty search results" className="mb-4" />
          <p className="text-sm font-semibold mb-2">No results found</p>
          <p className="mb-8">Try using different keywords</p>
          <button
            onClick={() => router.push("/")}
            className="w-50 h-11 bg-[#0093dd] text-white rounded-full"
          >
            Back to Home
          </button>
        </div>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <RecommendCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
