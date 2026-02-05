"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import NavbarLogo from "./NavbarLogo";
import { useAuth } from "@/context/AuthContext";
import ProfileMenu from "./ProfileMenu";
import { Search } from "lucide-react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const goTo = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  /* =======================
     SUDAH LOGIN (MOBILE)
     ======================= */
  if (user) {
    return (
      <div className="md:hidden">
        <ProfileMenu />
      </div>
    );
  }

  /* =======================
     BELUM LOGIN (MOBILE)
     ======================= */
  return (
    <>
      {/* SEARCH ICON */}
      <button className="md:hidden transition">
        <Search size={20} />
      </button>

      {/* Hamburger Icon */}
      <Menu
        className="w-6 h-6 cursor-pointer md:hidden"
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className="fixed inset-0 bg-white z-50 max-w-360 mx-auto">
          {/* Header */}
          <div className="h-14 px-4 flex items-center justify-between border-b border-neutral-300">
            <NavbarLogo />
            <X
              className="w-6 h-6 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* Menu */}
          <nav className="flex flex-col items-center gap-4 p-6">
            <button
              onClick={() => goTo("/login")}
              className="hover:bg-[#0093dd] hover:text-white text-[#0093dd] py-2 w-1/2 rounded-full "
            >
              Login
            </button>

            <button
              onClick={() => goTo("/register")}
              className="hover:bg-[#0093dd] hover:text-white text-[#0093dd] py-2 w-1/2 rounded-full "
            >
              Register
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
