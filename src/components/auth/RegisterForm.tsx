"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Password confirmation does not match");
      return;
    }

    try {
      setLoading(true);
      await registerUser({
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
      });

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-86 border border-neutral-300 rounded-lg p-6 bg-white"
    >
      <h1 className="text-lg font-semibold mb-4">Sign Up</h1>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Enter your name"
          className="w-full border border-neutral-300 rounded-xl px-3 h-12 mb-3"
        />
      </div>

      {/* Username */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold">Username</label>
        <input
          name="username"
          value={form.username}
          onChange={onChange}
          placeholder="Enter your username"
          className="w-full border border-neutral-300 rounded-xl px-3 h-12 mb-3"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="Enter your email"
          className="w-full border border-neutral-300 rounded-xl px-3 h-12 mb-3"
        />
      </div>

      {/* Password */}
      <div className="relative flex flex-col gap-2 mb-3">
        <label className="text-sm font-bold">Password</label>
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={onChange}
          placeholder="Enter your password"
          className="w-full border border-neutral-300 rounded-xl px-3 h-12 pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-10"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative flex flex-col gap-2">
        <label className="text-sm font-bold">Confirm Password</label>
        <input
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={form.confirmPassword}
          onChange={onChange}
          placeholder="Enter your confirm password"
          className="w-full border border-neutral-300 rounded-xl px-3 h-12 mb-3"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-10"
        >
          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

      {/* Submit */}
      <button
        disabled={loading}
        className="w-full bg-[#0094dd] text-white h-12 rounded-full mt-2"
      >
        {loading ? "Loading..." : "Register"}
      </button>

      {/* Login link */}
      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-[#0094dd] font-semibold">
          Login
        </Link>
      </p>
    </form>
  );
}
