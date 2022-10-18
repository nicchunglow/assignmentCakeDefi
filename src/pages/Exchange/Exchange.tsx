import React, { useEffect, useRef, useState } from 'react';
import DateAndTime from 'components/DateAndTime';
import Select from 'components/Select';
import { supportedTokensId } from './Exchange.constant';
import { customAxios } from 'service/axios';

const Exchange: React.FC = () => {
  const [swapToken, setSwapToken] = useState('');
  const [receiveToken, setReceiveToken] = useState('');
  const previousSwapAmount = useRef(0);
  const [swapAmount, setSwapAmount] = useState<number>(0);
  const previousReceiveAmount = useRef(0);
  const [receiveAmount, setReceiveAmount] = useState<number>(0);
  const swapInputCondition = swapAmount !== previousSwapAmount.current;
  const receiveInputCondition = receiveAmount !== previousReceiveAmount.current;
  const disableInputCondition = !swapToken || !receiveToken;

  const swapTokenOnChange = (event: any) => {
    setSwapToken(event.target.value);
  };

  const receiveTokenOnChange = (event: any) => {
    setReceiveToken(event.target.value);
  };

  const swapInputOnChange = (event: any) => {
    setSwapAmount(event.target.value);
  };

  const receiveInputOnChange = async (event: any) => {
    previousReceiveAmount.current = receiveAmount;
    setReceiveAmount(event.target.value);
  };

  const getCoinData = async () => {
    if (swapInputCondition) {
      const symbol =
        supportedTokensId.find((item) => item.id === receiveToken)?.symbol ||
        '';
      const res = await customAxios.get(`/coins/${swapToken}`, {});
      const value = swapAmount * res.data.market_data.current_price[symbol];
      if (!value) {
        const secondRes = await customAxios.get(`/coins/${receiveToken}`, {});
        const symbol =
          supportedTokensId.find((item) => item.id === swapToken)?.symbol || '';
        const secondValue =
          swapAmount / secondRes.data.market_data.current_price[symbol];
        setReceiveAmount(secondValue);
        previousReceiveAmount.current = secondValue;
      } else {
        setReceiveAmount(value);
        previousReceiveAmount.current = value;
      }
    } else if (receiveInputCondition) {
      const symbol =
        supportedTokensId.find((item) => item.id === swapToken)?.symbol || '';
      const res = await customAxios.get(`/coins/${receiveToken}`, {});
      const value =
        receiveAmount * res.data?.market_data?.current_price?.[symbol];
      if (!value) {
        const secondRes = await customAxios.get(`/coins/${swapToken}`, {});
        const symbol =
          supportedTokensId.find((item) => item.id === receiveToken)?.symbol ||
          '';
        const secondValue =
          receiveAmount / secondRes.data.market_data.current_price[symbol];
        setSwapAmount(secondValue);
        previousSwapAmount.current = secondValue;
      } else {
        setSwapAmount(value);
        previousSwapAmount.current = value;
      }
    }
  };

  useEffect(() => {
    if (swapInputCondition && swapAmount && swapToken) {
      getCoinData();
    }
  }, [swapAmount, swapToken]);

  useEffect(() => {
    if (receiveInputCondition && receiveAmount && receiveToken) {
      getCoinData();
    }
  }, [receiveAmount, receiveToken]);

  return (
    <div className="flex justify-center rounded-lg w-2/4 h-3/4 shadow-2xl">
      <div className="flex flex-col mt-8 w-full items-center">
        <h1 aria-label="exchange-header-text">La Coco Crypto Exchange</h1>
        <DateAndTime />
        <span className="flex justify-around w-full h-full">
          <span className="flex flex-col items-center justify-around bg-primary-300 w-5/12 h-4/5 rounded-lg mt-8">
            <h2 aria-label="swap-token-text">Token to swap</h2>
            <Select
              aria-label="swap-token-select"
              list={supportedTokensId}
              action="swap"
              onChange={swapTokenOnChange}
            />
            <input
              disabled={disableInputCondition}
              aria-label="swap-input"
              placeholder={'Type how much to swap'}
              className="w-4/5 rounded-lg p-3"
              onChange={swapInputOnChange}
              value={swapAmount}
            />
          </span>
          <span className="flex flex-col items-center justify-around bg-secondary-300 w-5/12 h-4/5 rounded-lg mt-8">
            <h2 aria-label="receive-token-text">Token to Receive</h2>
            <Select
              aria-label="receive-token-select"
              list={supportedTokensId}
              action="receive"
              onChange={receiveTokenOnChange}
            />
            <input
              disabled={disableInputCondition}
              aria-label="receive-input"
              placeholder={'Type how much to receive'}
              className="w-4/5 rounded-lg p-3"
              value={receiveAmount}
              onChange={receiveInputOnChange}
            />
          </span>
        </span>
      </div>
    </div>
  );
};

export default Exchange;
