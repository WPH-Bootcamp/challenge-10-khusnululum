import { formatDate } from "@/lib/formatDate";
import { Post } from "@/types/post";
import { MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";

export default function RecommendCard({ post }: { post: Post }) {
  return (
    <article className="border-b border-neutral-300 pb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* ===== IMAGE (desktop only) ===== */}
        {post.imageUrl && (
          <Link
            href={`/posts/${post.id}`}
            className="hidden md:block md:w-65 shrink-0"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-40 md:h-36 rounded-lg object-cover"
            />
          </Link>
        )}

        {/* ===== CONTENT ===== */}
        <div className="flex-1">
          <Link href={`/posts/${post.id}`}>
            <h3 className="font-semibold text-base mb-2 hover:underline">
              {post.title}
            </h3>
          </Link>

          {/* Tags */}
          <div className="flex gap-2 mb-2 flex-wrap">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded border text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {post.content}
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Link
              href={`/profile/${post.author.username}`}
              className="font-medium text-gray-700 hover:underline"
            >
              {post.author.name}
            </Link>
            <span>•</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>

          <div className="flex gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <ThumbsUp size={14} />
              {post.likes}
            </span>

            <span className="flex items-center gap-1">
              <MessageCircle size={14} />
              {post.comments}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
