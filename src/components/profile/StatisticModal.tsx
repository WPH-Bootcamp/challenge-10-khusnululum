"use client";

import { useState } from "react";
import { ThumbsUp, MessageCircle, X } from "lucide-react";

type Props = {
  post: any;
  onClose: () => void;
};

export default function StatisticModal({ post, onClose }: Props) {
  const [tab, setTab] = useState<"like" | "comment">("like");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-xl p-4 max-h-[80vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Statistic</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* TABS */}
        <div className="flex border-b mb-3 text-sm">
          <button
            onClick={() => setTab("like")}
            className={`flex-1 pb-2 ${
              tab === "like"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            <ThumbsUp size={14} className="inline mr-1" />
            Like
          </button>
          <button
            onClick={() => setTab("comment")}
            className={`flex-1 pb-2 ${
              tab === "comment"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            <MessageCircle size={14} className="inline mr-1" />
            Comment
          </button>
        </div>

        {/* CONTENT */}
        {tab === "like" && (
          <div className="space-y-3">
            <p className="text-sm font-medium">Like ({post.likes})</p>
            {/* Dummy / nanti dari API */}
            <p className="text-xs text-gray-500">List user yang like</p>
          </div>
        )}

        {tab === "comment" && (
          <div className="space-y-3">
            <p className="text-sm font-medium">Comment ({post.comments})</p>
            <p className="text-xs text-gray-500">List komentar</p>
          </div>
        )}
      </div>
    </div>
  );
}
