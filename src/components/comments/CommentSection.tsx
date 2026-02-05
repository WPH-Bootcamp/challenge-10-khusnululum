"use client";

import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { getCommentsByPostId } from "@/lib/api";

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  user: {
    name: string;
    avatar?: string;
  };
};

type Props = {
  postId: number;
  onOpenAll: () => void;
};

export default function CommentSection({ postId, onOpenAll }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCommentsByPostId(postId)
      .then((res) => {
        setComments(res);
      })
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) {
    return <p className="text-sm text-gray-400 mt-6">Loading comments…</p>;
  }

  return (
    <section className="mt-8">
      {/* ===== TITLE ===== */}
      <h3 className="font-semibold mb-3">Comments ({comments.length})</h3>

      {/* ===== FORM ===== */}
      <CommentForm postId={postId} />

      {/* ===== COMMENTS LIST (PREVIEW 3) ===== */}
      <div className="mt-6 space-y-4">
        {comments.slice(0, 3).map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {/* ===== SEE ALL ===== */}
      {comments.length > 3 && (
        <button
          onClick={onOpenAll}
          className="mt-4 text-sm text-[#0093dd] hover:underline"
        >
          See All Comments
        </button>
      )}
    </section>
  );
}
