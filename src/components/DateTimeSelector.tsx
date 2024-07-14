'use client';

import { Dispatch, SetStateAction } from 'react';

interface DateTimeSelectorProps {
  date: string;
  time: string;
  onDateChange: Dispatch<SetStateAction<string>>;
  onTimeChange: Dispatch<SetStateAction<string>>;
}

export default function DateTimeSelector({ date, time, onDateChange, onTimeChange }: DateTimeSelectorProps) {
  return (
    <div className="mb-8">
      <input
        type="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="mr-4 p-2 border rounded"
      />
      <input
        type="range"
        min="0"
        max="1439"
        value={parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])}
        onChange={(e) => {
          const minutes = parseInt(e.target.value);
          const hours = Math.floor(minutes / 60);
          const mins = minutes % 60;
          onTimeChange(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`);
        }}
        className="w-full mb-4"
      />
      <div className="text-center">{time}</div>
    </div>
  );
}