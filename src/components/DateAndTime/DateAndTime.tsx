import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [date, setDate] = useState(new Date());

  const refreshClock = () => {
    setDate(new Date());
  };
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    const cleanup = () => {
      clearInterval(timerId);
    };
    return cleanup;
  }, []);
  return (
    <div aria-label="date-and-time" className="flex justify-center">
      <span className="flex justify-around w-full">
        <p aria-label="date">{date.toDateString()}</p>
        <p aria-label="time">Time: {date.toLocaleTimeString()}</p>
      </span>
    </div>
  );
};
export default Clock;
