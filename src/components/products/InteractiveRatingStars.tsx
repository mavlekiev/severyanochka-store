"use client";

import { useState } from "react";
import { FilledStarIcon } from "../ui/FilledStarIcon";
import { OutlineStarIcon } from "../ui/OutlineStarIcon";

interface InteractiveRatingProps {
  value: number;
  onChange: (rating: number) => void;
}

export default function InteractiveRatingStars({
  value,
  onChange,
}: InteractiveRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="focus:outline-none"
          aria-label={`Оценить ${star} звездами`}
        >
          {(hoverRating || value) >= star ? (
            <FilledStarIcon />
          ) : (
            <OutlineStarIcon />
          )}
        </button>
      ))}
    </div>
  );
}
