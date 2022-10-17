import React from 'react';
import DateAndTime from 'components/DateAndTime';
const Exchange: React.FC = () => {
  return (
    <div className="flex-col">
      <h1 aria-label="exchange-header-text">La Coco Crypto Exchange</h1>
      <DateAndTime />
    </div>
  );
};

export default Exchange;
