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
    <span aria-label="date-and-time">
      <p aria-label="time">Time: {date.toLocaleTimeString()}</p>
    </span>
  );
};
export default Clock;
