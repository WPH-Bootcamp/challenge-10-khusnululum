"use client";

import Image from "next/image";

const BASE_URL = "https://be-blg-production.up.railway.app";

type Comment = {
  content: string;
  createdAt: string;
  user?: {
    name?: string;
    avatar?: string;
  } | null;
};

type Props = {
  comment: Comment;
};

export default function CommentItem({ comment }: Props) {
  const userName = comment.user?.name ?? "Anonymous";

  const avatarSrc = comment.user?.avatar
    ? `${BASE_URL}/${comment.user.avatar}`
    : "/Avatar.svg";

  return (
    <div className="flex gap-3 border-t border-neutral-300 pt-4 ">
      {/* AVATAR */}
      <Image
        src={avatarSrc}
        alt={userName}
        width={32}
        height={32}
        className="rounded-full"
      />

      {/* CONTENT */}
      <div>
        <p className="text-sm font-medium">{userName}</p>
        <p className="text-xs text-gray-400">
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm mt-1">{comment.content}</p>
      </div>
    </div>
  );
}
