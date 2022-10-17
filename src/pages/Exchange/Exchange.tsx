import React from 'react';
import DateAndTime from 'components/DateAndTime';
import Select from 'components/Select';
import { supportedTokensId } from './Exchange.constant';

const Exchange: React.FC = () => {
  return (
    <div className="flex justify-center rounded-lg w-2/4 h-2/4 border-1 shadow-lg">
      <div className="flex flex-col mt-8 w-full items-center">
        <h1 aria-label="exchange-header-text">La Coco Crypto Exchange</h1>
        <DateAndTime />
        <span className="flex justify-around w-full h-full">
          <span className="flex flex-col items-center justify-around bg-primary-200 w-1/3 h-4/5 rounded-lg mt-8">
            <h2 aria-label="swap-token-text">Token to swap</h2>
            <Select
              aria-label="swap-token-select"
              list={supportedTokensId}
              action="swap"
            />
          </span>
          <span className="flex flex-col items-center justify-around bg-secondary-200 w-1/3 h-4/5 rounded-lg mt-8">
            <h2 aria-label="receive-token-text">Token to Receive</h2>
            <Select
              aria-label="receive-token-select"
              list={supportedTokensId}
              action="receive"
            />
          </span>
        </span>
      </div>
    </div>
  );
};

export default Exchange;
