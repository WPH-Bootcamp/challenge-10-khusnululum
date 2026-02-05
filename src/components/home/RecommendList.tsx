import RecommendCard from "./RecommendCard";

type Props = {
  posts: any[];
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

export default function RecommendList({
  posts,
  page,
  lastPage,
  onPageChange,
}: Props) {
  return (
    <section className="mt-6 w-full px-4">
      <h2 className="text-lg font-semibold mb-4">Recommend For You</h2>

      <div className="space-y-6">
        {posts.map((post) => (
          <RecommendCard key={post.id} post={post} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-6 mt-8 text-sm">
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </button>

        <span className="w-8 h-8 rounded-full bg-[#0093dd] text-white flex items-center justify-center">
          {page}
        </span>

        <button
          disabled={page === lastPage}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
}
