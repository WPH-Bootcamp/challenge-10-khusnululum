"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/api";
import RichTextEditor from "./RichTextEditor";

export default function WritePostForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!title || !content) {
      alert("Title & content wajib diisi");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append(
      "tags",
      JSON.stringify(
        tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      ),
    );

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      await createPost(formData);
      router.push("/profile");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 max-w-183 mx-auto">
      {/* TITLE */}
      <div>
        <label className="text-sm font-semibold">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your title"
          className="w-full h-12 mt-1 px-3 py-2 border border-neutral-300 rounded-md text-sm"
        />
      </div>

      {/* CONTENT */}
      <div>
        <label className="text-sm font-semibold">Content</label>

        <RichTextEditor value={content} onChange={setContent} />
      </div>

      {/* COVER IMAGE */}
      <div>
        <label className="text-sm font-semibold">Cover Image</label>

        <label
          htmlFor="cover-image"
          className="mt-2 flex flex-col items-center justify-center gap-2
               border-2 border-dashed border-gray-300 rounded-lg
               h-80 cursor-pointer hover:border-[#0093dd]
               transition text-center"
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="h-full w-full object-cover rounded-lg"
            />
          ) : (
            <>
              <img src="/uploadCloud.svg" alt="Upload Cloud" />
              <p className="text-sm text-[#0093dd] font-medium">
                Click to upload{" "}
                <span className="text-neutral-700">or drag and drop</span>
              </p>
              <p className="text-xs text-gray-400">PNG or JPG (max 5MB)</p>
            </>
          )}
        </label>

        <input
          id="cover-image"
          type="file"
          accept="image/png,image/jpeg"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            if (file.size > 5 * 1024 * 1024) {
              alert("Max image size is 5MB");
              return;
            }

            setImage(file);
          }}
        />
      </div>

      {/* TAGS */}
      <div>
        <label className="text-sm font-semibold">Tags</label>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Programming, Frontend, Coding"
          className="w-full mt-1 px-3 py-2 border border-neutral-300 rounded-md text-sm"
        />
      </div>

      <div className="flex md:justify-end">
        {/* SUBMIT */}
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full md:w-1/4 bg-[#0093dd] text-white py-2 rounded-full text-sm font-medium hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Finish"}
        </button>
      </div>
    </div>
  );
}
