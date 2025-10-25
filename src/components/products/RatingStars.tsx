import { FilledStarIcon } from "../ui/FilledStarIcon";
import { OutlineStarIcon } from "../ui/OutlineStarIcon";
import { HalfFilledStarIcon } from "../ui/HalfFilledStarIcon";

interface Rating {
  rating: number;
}

export default function RatingStars({ rating }: Rating) {
  const roundedRating = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const array = [...Array(5)];

  return (
    <div className="flex items-center gap-1">
      {array.map((_, index) => {
        if (index < fullStars) {
          return <FilledStarIcon key={index} />;
        } else if (index === fullStars && hasHalfStar) {
          return <HalfFilledStarIcon key={index} />;
        } else {
          return <OutlineStarIcon key={index} />;
        }
      })}
    </div>
  );
}
