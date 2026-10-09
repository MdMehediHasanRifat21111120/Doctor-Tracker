"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import {
  useSignupMutation,
  useLazyGetMeQuery,
} from "@/redux/features/auth/authApi";

export default function RegisterPage() {
  const [signup, { isLoading }] = useSignupMutation();
  const [getMe] = useLazyGetMeQuery();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await signup({
        name: formData.firstName + " " + formData.lastName,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      router.push("/login");
    } catch (error) {
      console.error(error);

      setError(
        error?.data?.message || "Invalid email or password. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-2">
          <div className="hidden bg-blue-800 p-10 text-white lg:flex lg:flex-col lg:justify-center xl:p-14">
            <div className="max-w-md">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-100">
                LMS Platform
              </p>

              <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                Start your learning journey today.
              </h1>

              <p className="mt-5 text-base leading-7 text-blue-100">
                Create your account and get access to courses, lessons, quizzes,
                and your personal learning dashboard.
              </p>

              <div className="mt-10 space-y-5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm">
                    ✓
                  </span>
                  <p className="text-sm text-blue-50">Learn at your own pace</p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm">
                    ✓
                  </span>
                  <p className="text-sm text-blue-50">
                    Track your learning progress
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm">
                    ✓
                  </span>
                  <p className="text-sm text-blue-50">
                    Access your courses anytime
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="mx-auto w-full max-w-lg">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Create your account
                </h2>

                <p className="mt-2 text-sm text-gray-500 sm:text-base">
                  Enter your information to get started.
                </p>
              </div>

              {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />

                  <label
                    htmlFor="terms"
                    className="text-sm leading-5 text-gray-600"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 active:scale-[0.99] sm:text-base"
                >
                  Create Account
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
