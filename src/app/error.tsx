"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="text-center py-10 text-red-500">
      {error.message}
    </div>
  );
}
