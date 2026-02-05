"use client";

import Link from "next/link";
import { useState } from "react";
import DeletePostModal from "./DeletePostModal";
import StatisticModal from "./StatisticModal";

export default function MyPostItem({ post }: { post: any }) {
  const [showDelete, setShowDelete] = useState(false);
  const [showStatistic, setShowStatistic] = useState(false);

  return (
    <>
      <div className="border-b pb-6">
        <h3 className="font-semibold mb-1">{post.title}</h3>

        {/* TAGS */}
        <div className="flex gap-2 flex-wrap mb-2">
          {post.tags.map((tag: string) => (
            <span key={tag} className="text-xs px-2 py-1 rounded border">
              {tag}
            </span>
          ))}
        </div>

        {/* EXCERPT */}
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {post.content}
        </p>

        {/* META */}
        <p className="text-xs text-gray-400 mb-3">
          Created {new Date(post.createdAt).toLocaleDateString()} • Last updated{" "}
          {new Date(post.updatedAt).toLocaleDateString()}
        </p>

        {/* ACTION */}
        <div className="flex gap-4 text-xs">
          <button
            type="button"
            onClick={() => setShowStatistic(true)}
            className="text-[#0093dd] hover:underline"
          >
            Statistic
          </button>

          <Link
            href={`/posts/${post.id}/edit`}
            className="text-[#0093dd] hover:underline"
          >
            Edit
          </Link>

          <button
            type="button"
            onClick={() => setShowDelete(true)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <DeletePostModal
            postId={post.id}
            onClose={() => setShowDelete(false)}
          />
        </div>
      )}
      {/* ===== STATISTIC MODAL ===== */}
      {showStatistic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <StatisticModal post={post} onClose={() => setShowStatistic(false)} />
        </div>
      )}
    </>
  );
}
