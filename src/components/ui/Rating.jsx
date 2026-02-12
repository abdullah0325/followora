function RatingStars({ rating = 0, total = 5 }) {
  return (
    <div className="flex justify-center mt-6 gap-1">
      {Array.from({ length: total }).map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={index < rating ? "currentColor" : "none"}
          stroke="currentColor"
          className={`w-6 h-6 ${
            index < rating
              ? "text-pink-500 drop-shadow-[0_0_6px_rgba(236,72,153,0.6)]"
              : "text-pink-300"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.48 3.499a.562.562 0 011.04 0l2.1 4.26a.563.563 0 00.424.308l4.7.683a.563.563 0 01.312.96l-3.4 3.314a.563.563 0 00-.162.498l.803 4.682a.563.563 0 01-.817.594l-4.2-2.207a.563.563 0 00-.523 0l-4.2 2.207a.563.563 0 01-.817-.594l.803-4.682a.563.563 0 00-.162-.498l-3.4-3.314a.563.563 0 01.312-.96l4.7-.683a.563.563 0 00.424-.308l2.1-4.26z"
          />
        </svg>
      ))}
    </div>
  );
}
export default RatingStars