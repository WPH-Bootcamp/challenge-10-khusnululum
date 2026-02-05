"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { user, logout } = useAuth();
  const router = useRouter();

  // ✅ useEffect HARUS SELALU DIPANGGIL
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ BARU BOLEH RETURN SETELAH SEMUA HOOKS
  if (!user) return null;

  const avatarUrl = user.avatar
    ? `https://be-blg-production.up.railway.app${user.avatar}`
    : "/Avatar.svg";

  return (
    <div className="relative" ref={menuRef}>
      {/* AVATAR */}
      <button onClick={() => setOpen(!open)}>
        <Image
          src={avatarUrl}
          alt={user.name}
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 py-2 w-50 bg-white border border-neutral-300 rounded-2xl shadow z-50">
          <button
            onClick={() => {
              setOpen(false);
              router.push("/profile");
            }}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            <img src="/profile.svg" alt="" className="inline mr-2" />
            Profile
          </button>

          <button
            onClick={() => {
              setOpen(false);
              logout();
              router.push("/login");
            }}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            <img src="/logout.svg" alt="logout" className="inline mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
