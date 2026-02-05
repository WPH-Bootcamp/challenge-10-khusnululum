"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import EditProfileModal from "./EditProfileModal";

type Props = {
  activeTab: "posts" | "password";
  onChangeTab: (tab: "posts" | "password") => void;
};

const BASE_URL = "https://be-blg-production.up.railway.app";

export default function MyProfileHeader({ activeTab, onChangeTab }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);

  if (!user) return null;

  const avatarUrl = user.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `${BASE_URL}${user.avatar}`
    : "/Avatar.svg";

  return (
    <>
      <section className="bg-white mb-6 border-b border-neutral-300 pb-4">
        {/* TOP */}
        <div className="flex items-center justify-between border border-neutral-300 rounded-xl mb-4 py-4 px-4">
          <div className="flex items-center gap-3">
            <Image
              src={avatarUrl}
              alt={user.name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />

            <div>
              <p className="font-semibold leading-none">{user.name}</p>
              <p className="text-xs text-gray-500">
                {user.headline || "No Headline"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpenEdit(true)}
            className="text-sm font-semibold text-[#0093dd] underline"
          >
            Edit Profile
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-6 w-full md:w-sm text-sm border-b border-neutral-300 mb-4 ">
          <button
            onClick={() => onChangeTab("posts")}
            className={clsx(
              "pb-2",
              activeTab === "posts"
                ? "text-[#0093dd] border-b-2 border-[#0093dd w-full font-medium"
                : "text-gray-500 w-full",
            )}
          >
            Your Post
          </button>

          <button
            onClick={() => onChangeTab("password")}
            className={clsx(
              "pb-2",
              activeTab === "password"
                ? "text-[#0093dd] border-b-2 border-[#0093dd] w-full font-medium"
                : "text-gray-500 w-full",
            )}
          >
            Change Password
          </button>
        </div>

        <div className="md:flex md:justify-end">
          {/* WRITE POST */}
          <button
            onClick={() => router.push("/posts/create")}
            className="w-full md:w-1/4 h-11 flex items-center justify-center gap-2 bg-[#0093dd] text-white py-2 rounded-full text-sm font-medium hover:bg-blue-500"
          >
            <Pencil size={16} />
            Write Post
          </button>
        </div>
      </section>

      {/* MODAL */}
      <EditProfileModal open={openEdit} onClose={() => setOpenEdit(false)} />
    </>
  );
}
