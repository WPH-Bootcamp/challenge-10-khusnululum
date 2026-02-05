"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { getCommentsByPostId } from "@/lib/api";
import { CommentType } from "@/types/comment";

type Props = {
  postId: number;
  onClose: () => void;
};

export default function CommentModal({ postId, onClose }: Props) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await getCommentsByPostId(postId);
        setComments(res.data); // ⬅️ SESUAI RESPONSE API
      } catch (err) {
        console.error("Failed to fetch comments", err);
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [postId]);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center">
      <div className="bg-white w-full max-w-360 h-full overflow-y-auto relative">
        {/* HEADER */}
        <div className="h-14 px-4 flex items-center justify-between">
          <h3 className="font-semibold">Comments ({comments.length})</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <CommentForm
            postId={postId}
            onSuccess={(newComment) =>
              setComments((prev) => [newComment, ...prev])
            }
          />

          <div className="mt-6 space-y-4">
            {loading && (
              <p className="text-sm text-gray-500 text-center">
                Loading comments...
              </p>
            )}

            {!loading && comments.length === 0 && (
              <p className="text-sm text-gray-500 text-center">
                No comments yet
              </p>
            )}

            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
