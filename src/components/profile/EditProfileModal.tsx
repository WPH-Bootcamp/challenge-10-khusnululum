"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Camera } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const BASE_URL = "https://be-blg-production.up.railway.app";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function EditProfileModal({ open, onClose }: Props) {
  const { user, refreshUser } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [headline, setHeadline] = useState(user?.headline ?? "");
  const [loading, setLoading] = useState(false);

  if (!open || !user) return null;

  const avatarUrl = user.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `${BASE_URL}${user.avatar}`
    : "/Avatar.svg";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, headline }),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      await refreshUser(); // 🔥 penting
      onClose();
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl p-5 relative">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="font-semibold text-lg mb-4">Edit Profile</h2>

        {/* AVATAR */}
        <div className="flex justify-center mb-4 relative">
          <div className="relative">
            <Image
              src={avatarUrl}
              alt={user.name}
              width={72}
              height={72}
              className="rounded-full object-cover"
            />

            {/* icon camera (UI only, upload next step) */}
            <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full">
              <Camera size={14} />
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Profile Headline</label>
            <input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-full text-sm font-medium mt-4 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
