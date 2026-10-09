export default function Loading({ text = "Loading...", fullScreen = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "min-h-screen" : "py-10"
      }`}
    >
      <div
        className="
          h-10 w-10
          sm:h-12 sm:w-12
          animate-spin
          rounded-full
          border-4
          border-gray-200
          border-t-blue-600
        "
      />
      {text && (
        <p className="text-sm sm:text-base font-medium text-gray-600">{text}</p>
      )}
    </div>
  );
}
