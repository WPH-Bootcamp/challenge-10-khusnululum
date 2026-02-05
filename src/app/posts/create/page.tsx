import WritePostForm from "@/components/posts/WritePostForm";

export default function CreatePostPage() {
  return (
    <main className="px-4 pt-4 pb-20 max-w-183 mx-auto">
      <h1 className="font-semibold text-lg mb-4">Write Post</h1>
      <WritePostForm />
    </main>
  );
}
