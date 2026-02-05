import Link from "next/link";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { Post } from "@/types/post";

export default function MostLikedCard({ post }: { post: Post }) {
  return (
    <article className="border-b border-neutral-300 pb-4">
      {/* TITLE */}
      <Link
        href={`/posts/${post.id}`}
        className="block font-medium text-sm mb-1 hover:underline"
      >
        {post.title}
      </Link>

      {/* EXCERPT */}
      <p className="text-xs text-gray-600 line-clamp-2 mb-2">{post.content}</p>

      {/* META */}
      <div className="flex gap-3 text-sm text-gray-600 mb-5">
        <span className="flex items-center gap-1">
          <ThumbsUp size={14} />
          {post.likes}
        </span>

        <span className="flex items-center gap-1">
          <MessageCircle size={14} />
          {post.comments}
        </span>
      </div>
    </article>
  );
}
