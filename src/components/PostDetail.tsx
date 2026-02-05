"use client";

import { useState } from "react";
import { MessageCircle, ThumbsUp } from "lucide-react";
import CommentSection from "@/components/comments/CommentSection";
import CommentModal from "@/components/comments/CommentModal";
import AnotherPostSection from "./AnotherPostSection";
import { PostDetailType, PostPreviewType } from "@/types/post";

type Props = {
  post: PostDetailType;
  anotherPost?: PostPreviewType;
};

export default function PostDetail({ post, anotherPost }: Props) {
  const [openComments, setOpenComments] = useState(false);

  return (
    <main className="px-4 pt-4 pb-20 max-w-200 mx-auto">
      <h1 className="text-xl font-semibold mb-3">{post.title}</h1>

      <div className="flex gap-2 flex-wrap mb-3">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded border text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="text-xs text-gray-500 mb-4">
        <span className="font-medium text-gray-700">{post.author.name}</span>
        <span> • </span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="flex gap-4 text-sm text-gray-600 mb-5 border-y border-y-neutral-300 py-4">
        <span className="flex items-center gap-1">
          <ThumbsUp size={14} />
          {post.likes}
        </span>

        <span className="flex items-center gap-1">
          <MessageCircle size={14} />
          {post.comments}
        </span>
      </div>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full rounded-lg mb-6 object-cover"
        />
      )}

      <article className="text-sm leading-relaxed space-y-4 border-b border-b-neutral-300 pb-6 mb-4">
        {post.content.split("\n").map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </article>

      <CommentSection
        postId={post.id}
        onOpenAll={() => setOpenComments(true)}
      />

      {openComments && (
        <CommentModal postId={post.id} onClose={() => setOpenComments(false)} />
      )}

      {anotherPost && <AnotherPostSection post={anotherPost} />}
    </main>
  );
}
