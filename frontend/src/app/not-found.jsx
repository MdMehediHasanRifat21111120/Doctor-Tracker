"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl text-center">
        <p className="text-sm sm:text-base font-semibold text-blue-600">
          ERROR 404
        </p>

        <h1 className="mt-3 text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900">
          Page Not Found
        </h1>

        <p className="mt-5 text-sm sm:text-base md:text-lg text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved, deleted, or the URL may be incorrect.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => router.back()}
            className="
              w-full
              sm:w-auto
              rounded-lg
              border
              border-gray-300
              bg-white
              px-5
              py-3
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-100
            "
          >
            Go Back
          </button>

          <Link
            href="/"
            className="
              w-full
              sm:w-auto
              rounded-lg
              bg-blue-600
              px-5
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-blue-700
            "
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
