"use client";

import { useState } from "react";
import { postComment } from "@/lib/api";
import { CommentType } from "@/types/comment";

type Props = {
  postId: number;
  onSuccess?: (comment: CommentType) => void;
};

export default function CommentForm({ postId }: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!content.trim()) return;

    setLoading(true);
    await postComment(postId, content);
    setContent("");
    setLoading(false);

    // refresh halaman biar comment baru muncul
    window.location.reload();
  }

  return (
    <div className="space-y-3 md:flex md:flex-col md:items-end">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your comment"
        className="w-full h-35 rounded-lg border border-neutral-300 p-3 text-sm"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full md:max-w-1/4 md:justify-end rounded-full bg-[#0093dd] text-white py-3 text-sm font-medium"
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
