import { PostPreviewType } from "@/types/post";
import { MessageCircle, ThumbsUp } from "lucide-react";

type Props = {
  post: PostPreviewType;
};

export default function AnotherPostSection({ post }: Props) {
  return (
    <section className="mt-10 border-t border-t-neutral-300 pt-6">
      <h3 className="text-lg font-semibold mb-3">Another Post</h3>

      <h4 className="font-medium">{post.title}</h4>

      <div className="flex gap-2 flex-wrap my-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 border rounded text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>

      <div className="flex gap-4 text-xs text-gray-500 mt-3">
        <span className="flex items-center gap-1">
          <ThumbsUp size={12} /> {post.likes}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle size={12} /> {post.comments}
        </span>
      </div>
    </section>
  );
}
