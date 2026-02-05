"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser({ email, password });
      login(res.token); // SIMPAN TOKEN
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-86 border border-neutral-300 rounded-2xl p-6 bg-white"
    >
      <h1 className="text-xl font-bold mb-8">Sign In</h1>

      <div className="flex flex-col gap-2 mb-2">
        <label className="text-sm font-bold">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-neutral-300 rounded-xl px-3 h-12 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="relative flex flex-col gap-2 mb-3">
        <label className="text-sm font-bold">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="w-full border border-neutral-300 rounded-xl px-3 h-12 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-11"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

      <button className="w-full bg-[#0094dd] text-white h-12 rounded-full">
        Login
      </button>

      <p className="text-sm text-center mt-4">
        Don't have an account?{" "}
        <Link href="/register" className="text-[#0094dd] font-semibold">
          Register
        </Link>
      </p>
    </form>
  );
}
