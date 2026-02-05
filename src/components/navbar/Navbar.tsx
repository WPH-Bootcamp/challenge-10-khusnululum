"use client";

import NavbarLogo from "./NavbarLogo";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && keyword.trim()) {
      router.push(`/search?q=${encodeURIComponent(keyword)}`);
      setKeyword("");
    }
  }

  return (
    <header className="sticky top-0 w-full border-b border-neutral-300 bg-white max-w-360 mx-auto px-4">
      <div className="h-14 flex items-center justify-between">
        {/* LEFT */}
        <NavbarLogo />

        {/* CENTER SEARCH */}
        <div className="hidden md:flex mx-6 flex-1">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search post title..."
            className="w-full max-w-md mx-auto px-3 py-1.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0093dd]"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-black"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-[#0093dd] text-white px-4 py-1.5 rounded-full text-sm"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/posts/create"
                className="flex items-center gap-1 text-sm font-medium text-[#0093dd]"
              >
                <Pencil size={16} />
                Write Post
              </Link>

              <ProfileMenu />
            </div>
          )}

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
