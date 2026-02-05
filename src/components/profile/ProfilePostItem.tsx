"use client";

import { ThumbsUp, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  post: any;
  isOwner?: boolean;
};

export default function ProfilePostItem({ post, isOwner }: Props) {
  const router = useRouter();

  return (
    <>
      {/* ===== POST ITEM ===== */}
      <div className="border-b border-neutral-300 pb-4 mb-4 relative">
        <h3 className="font-semibold text-sm mb-1">
          <Link href={`/posts/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        <div className="flex gap-2 flex-wrap mb-2">
          {post.tags?.map((tag: string) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded border text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {post.content}
        </p>

        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>
            Created {new Date(post.createdAt).toLocaleDateString("en-GB")}
          </span>

          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1">
              <ThumbsUp size={14} /> {post.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle size={14} /> {post.comments}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
