'use client';

import { useState } from 'react';
import DateTimeSelector from '@/components/DateTimeSelector';
import NewsSites from '@/components/NewsSites';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('00:00');

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">News Site Timelapse</h1>
      <DateTimeSelector
        date={selectedDate}
        time={selectedTime}
        onDateChange={setSelectedDate}
        onTimeChange={setSelectedTime}
      />
      <NewsSites date={selectedDate} time={selectedTime} />
    </main>
  );
}