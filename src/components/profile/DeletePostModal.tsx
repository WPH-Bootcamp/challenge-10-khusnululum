"use client";

import { deletePost } from "@/lib/api";

type Props = {
  postId: number;
  onClose: () => void;
};

export default function DeletePostModal({ postId, onClose }: Props) {
  async function handleDelete() {
    try {
      await deletePost(postId);
      onClose();
      window.location.reload(); // 🔥 refresh list post
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="bg-white w-[90%] max-w-sm rounded-xl p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Delete</h3>
        <button onClick={onClose}>✕</button>
      </div>

      <p className="text-sm text-gray-500 mb-4">Are you sure want to delete?</p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm border rounded-full"
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm bg-red-500 text-white rounded-full"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
