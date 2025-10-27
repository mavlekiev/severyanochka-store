"use client";

import { useState } from "react";
import InteractiveRatingStars from "./InteractiveRatingStars";

export default function ReviewFormSection() {
  const [selectedRating, setSelectedRating] = useState(5);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h3 className="font-bold text-[18px]">Ваша оценка</h3>
        <InteractiveRatingStars
          value={selectedRating}
          onChange={setSelectedRating}
        />
      </div>
      <textarea
        placeholder="Отзыв"
        className="lg:w-[688px] md:w-[544px] max-md:w-[334px] w-full p-2 border border-gray-200 rounded"
        rows={4}
      />
      <button className="max-w-[188px] p-2 bg-orange-200 text-orange-100 rounded">
        Отправить отзыв
      </button>
    </div>
  );
}
