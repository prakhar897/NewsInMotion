'use client';
import React, { useState } from 'react';
import DatePickerComponent from '../components/DatePickerComponent';

type ImageData = {
  site: string;
  image_base64: string;
};

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedTime, setSelectedTime] = useState<number>(0);

  const fetchImages = async (date: Date, time: number) => {
    try {
      const response = await fetch('/api/fetchImages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, time }),
      });
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Failed to fetch images from API:', error);
      // Use placeholder image from placeholder.co
      const placeholderImage: ImageData = {
        site: "Placeholder",
        image_base64: "https://via.placeholder.com/1920x1080",
      };
      setImages([placeholderImage,placeholderImage,placeholderImage,placeholderImage,placeholderImage,placeholderImage]);
    }
    setSelectedTime(time);
  };

  return (
    <div className="p-4">
      <DatePickerComponent onDateTimeChange={fetchImages} />
      <div className="mt-4">
        Selected Time: {Math.floor(selectedTime / 60)}:{selectedTime % 60}
      </div>
      <div className="grid grid-cols-2">
        {images.map((item, index) => (
          <div key={index} className="bg-gray-200 border border-gray-300">
            <img src={item.image_base64} alt="Fetched" />
          </div>
        ))}
      </div>
    </div>
  );
}