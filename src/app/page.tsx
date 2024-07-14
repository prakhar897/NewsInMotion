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
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const timestamp = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    try {
      const response = await fetch('https://master-node-backend.onrender.com/news-in-motion/get-snapshots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp,
          siteList: ["https://www.cnn.com", "https://www.cnn.com","https://www.washingtonpost.com","https://www.nytimes.com",]
        }),
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

      const imagesArray = new Array(20).fill(placeholderImage);
      setImages(imagesArray);   
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