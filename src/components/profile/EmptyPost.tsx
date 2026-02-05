export default function EmptyPost() {
  return (
    <div className="text-center text-gray-500 py-20">
      <img src="/Empty.svg" alt="No post" className="mx-auto mb-4 w-32" />
      <p className="font-medium">No posts from this user yet</p>
      <p className="text-sm">Stay tuned for future posts</p>
    </div>
  );
}
