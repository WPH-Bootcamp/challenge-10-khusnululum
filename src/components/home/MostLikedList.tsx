import { Post } from "@/types/post";
import MostLikedCard from "./MostLikedCard";

type Props = {
  posts: Post[];
};

export default function MostLikedList({ posts }: Props) {
  return (
    <section className="mt-10 w-full px-4">
      <h2 className="text-lg font-semibold mb-4">Most liked</h2>

      <div className="space-y-4">
        {posts.map((post) => (
          <MostLikedCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
