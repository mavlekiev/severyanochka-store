"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  thumbnail: string;
  title: string;
  discountPercentage: number;
}

export default function ProductImageGallery({
  images,
  thumbnail,
  title,
  discountPercentage,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(thumbnail);

  const allImages = [thumbnail, ...images];

  return (
    <div className="flex lg:w-1/2">
      {allImages.length > 1 && (
        <div className="flex flex-col gap-2 mr-4 overflow-y-auto scrollbar-hide max-h-[500px]">
          {allImages.slice(0, 5).map((img: string, i: number) => (
            <button
              key={i}
              onClick={() => setSelectedImage(img)}
              className={`w-16 h-16 border rounded overflow-hidden flex-shrink-0 transition-all duration-200 ${
                selectedImage === img
                  ? "border-orange-100 border-2"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={img}
                alt={`Mini ${i + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <div className="relative flex-1">
        <Image
          src={selectedImage}
          alt={title}
          width={500}
          height={500}
          className="w-full h-auto object-contain"
          priority
        />
        {discountPercentage > 0 && (
          <div className="absolute top-[10px] lg:top-5 right-[10px] lg:right-5 bg-orange-100 text-white px-2 py-1 rounded font-medium text-base">
            -{Math.round(discountPercentage)}%
          </div>
        )}
      </div>
    </div>
  );
}
