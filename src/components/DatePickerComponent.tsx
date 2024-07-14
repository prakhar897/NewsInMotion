import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

type DatePickerComponentProps = {
  onDateTimeChange: (date: Date, time: number) => void;
};

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ onDateTimeChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState(0);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      onDateTimeChange(date, time);
    }
  };

  const handleTimeChange = (value: number | number[]) => {
    if (typeof value === 'number') {
      setTime(value);
      const newDate = new Date(startDate);
      newDate.setHours(Math.floor(value / 60));
      newDate.setMinutes(value % 60);
      onDateTimeChange(newDate, value);
    }
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        showTimeSelect={false}
      />
      <div style={{ marginTop: 20 }}>
        <Slider
          min={0}
          max={1439} // 24 hours * 60 minutes - 1
          value={time}
          onChange={handleTimeChange}
          marks={{ 0: '00:00', 720: '12:00', 1439: '23:59' }}
          step={1}
        />
      </div>
    </div>
  );
};

export default DatePickerComponent;