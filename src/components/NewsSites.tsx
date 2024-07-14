'use client';

import { useState, useEffect } from 'react';

const sites = [
  'newyorktimes.com',
  'washingtonpost.com',
  'wsj.com',
  'cnn.com'
];

interface NewsSitesProps {
  date: string;
  time: string;
}

export default function NewsSites({ date, time }: NewsSitesProps) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch images here (this is a placeholder)
    // In a real application, you would use the date and time to fetch the correct images
    const placeholderImages = sites.map((site) => `https://via.placeholder.com/400x300?text=${site}_${date}_${time}`);
    setImages(placeholderImages);
  }, [date, time]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((image, index) => (
        <div key={index} className="border rounded p-4">
          <img src={image} alt={`Front page of ${sites[index]}`} className="w-full h-auto" />
          <p className="mt-2 text-center">{sites[index]}</p>
        </div>
      ))}
    </div>
  );
}