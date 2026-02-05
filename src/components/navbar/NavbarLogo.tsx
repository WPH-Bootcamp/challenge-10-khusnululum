import Link from "next/link";

export default function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      {/* Placeholder logo */}
      <img src="/logo.svg" alt="Company Logo" />
      <span className="text-sm font-semibold">Your Logo</span>
    </Link>
  );
}
