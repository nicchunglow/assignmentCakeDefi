import React from 'react';
import DateAndTime from 'components/DateAndTime';
const Exchange: React.FC = () => {
  return (
    <div className="flex justify-center rounded-lg w-2/4 h-2/4 border-1 shadow-lg">
      <div className="flex flex-col mt-8">
        <h1 aria-label="exchange-header-text">La Coco Crypto Exchange</h1>
        <DateAndTime />
      </div>
    </div>
  );
};

export default Exchange;
