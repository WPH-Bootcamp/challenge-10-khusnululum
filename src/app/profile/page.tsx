"use client";

import { useEffect, useState } from "react";
import MyProfileHeader from "@/components/profile/MyProfileHeader";
import MyPostItem from "@/components/profile/MyPostItem";
import EmptyPost from "@/components/profile/EmptyPost";
import { useAuth } from "@/context/AuthContext";
import { getMyPosts } from "@/lib/api";

export default function ProfilePage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"posts" | "password">("posts");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await getMyPosts();
        setPosts(res.data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (!user) {
    return <main className="px-4 pt-6 text-center text-sm">Please login</main>;
  }

  return (
    <main className="px-4 pt-4 pb-20 max-w-360 mx-auto">
      <MyProfileHeader activeTab={tab} onChangeTab={setTab} />

      {tab === "posts" && (
        <>
          <h2 className="font-semibold mb-3">{posts.length} Post</h2>

          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : posts.length === 0 ? (
            <EmptyPost />
          ) : (
            posts.map((post) => <MyPostItem key={post.id} post={post} />)
          )}
        </>
      )}

      {tab === "password" && (
        <div className="text-sm text-gray-500">
          Change password form (next step)
        </div>
      )}
    </main>
  );
}
