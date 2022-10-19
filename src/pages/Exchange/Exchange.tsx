import React, { useEffect, useRef, useState } from 'react';
import { RiLoader4Line } from 'react-icons/ri';
import DateAndTime from 'components/DateAndTime';
import Select from 'components/Select';
import { supportedTokensId } from './Exchange.constant';
import { customAxios } from 'service/axios';

const Exchange: React.FC = () => {
  const [swapToken, setSwapToken] = useState('');
  const [receiveToken, setReceiveToken] = useState('');
  const [loading, SetLoading] = useState(false);
  const previousSwapAmount = useRef(0);
  const [swapAmount, setSwapAmount] = useState<number>(0);
  const previousReceiveAmount = useRef(0);
  const [receiveAmount, setReceiveAmount] = useState<number>(0);
  const swapInputCondition = swapAmount !== previousSwapAmount.current;
  const receiveInputCondition = receiveAmount !== previousReceiveAmount.current;
  const disableInputCondition = !swapToken || !receiveToken;
  const conversionSwapSymbol = supportedTokensId
    .find((token) => token.id === swapToken)
    ?.symbol.toUpperCase();
  const conversionReceiveSymbol = supportedTokensId
    .find((token) => token.id === receiveToken)
    ?.symbol.toUpperCase();

  const conversionPrice =
    swapAmount > 0 &&
    receiveAmount > 0 &&
    (receiveAmount / swapAmount).toFixed(2);
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

  const getTickerResult = (
    target: boolean,
    tickers: any[],
    targetToken: string,
    secondaryToken: string,
  ) => {
    const searchBy = target ? 'target_coin_id' : 'coin_id';
    const secondaryField = target ? 'coin_id' : 'target_coin_id';
    return tickers.find((ticker: any) => {
      return (
        ticker[searchBy] === targetToken &&
        ticker[secondaryField] === secondaryToken
      );
    });
  };

  const getCoinData = async (swapToReceive: boolean) => {
    SetLoading(true);
    if (swapInputCondition || receiveInputCondition) {
      const res = await customAxios.get(`/coins/${swapToken}`, {});
      const tickers = res.data?.tickers;
      const chosenToken = swapToReceive ? receiveToken : swapToken;
      const secondaryToken = swapToReceive ? swapToken : receiveToken;
      const chosenAmount = swapToReceive ? swapAmount : receiveAmount;
      const swapTargetTickerResult = getTickerResult(
        true,
        tickers,
        chosenToken,
        secondaryToken,
      );
      const swapBaseTickerResult = getTickerResult(
        false,
        tickers,
        chosenToken,
        secondaryToken,
      );
      const value = swapTargetTickerResult
        ? chosenAmount * swapTargetTickerResult?.last
        : chosenAmount / swapBaseTickerResult?.last;
      if (value) {
        swapToReceive ? setReceiveAmount(value) : setSwapAmount(value);
        swapToReceive
          ? (previousReceiveAmount.current = value)
          : (previousSwapAmount.current = value);
      }
      previousReceiveAmount.current = value;
      if (!swapTargetTickerResult && !swapBaseTickerResult) {
        const res = await customAxios.get(`/coins/${receiveToken}`, {});
        const tickers = res.data?.tickers;
        const receiveTargetTickerResult = getTickerResult(
          true,
          tickers,
          chosenToken,
          secondaryToken,
        );
        const receiveBaseTickerResult = getTickerResult(
          false,
          tickers,
          chosenToken,
          secondaryToken,
        );
        const secondValue = receiveTargetTickerResult
          ? chosenAmount * receiveTargetTickerResult?.last
          : chosenAmount / receiveBaseTickerResult?.last;
        if (secondValue) {
          swapToReceive
            ? setReceiveAmount(secondValue)
            : setSwapAmount(secondValue);
          swapToReceive
            ? (previousReceiveAmount.current = secondValue)
            : (previousSwapAmount.current = secondValue);
        }
      }
    }
    SetLoading(false);
  };

  useEffect(() => {
    if (swapInputCondition && swapAmount && swapToken) {
      getCoinData(true);
    }
  }, [swapAmount, swapToken]);

  useEffect(() => {
    if (receiveInputCondition && receiveAmount && receiveToken) {
      getCoinData(false);
    }
  }, [receiveAmount, receiveToken]);

  return (
    <div className="flex justify-center rounded-lg w-2/4 h-3/4 shadow-2xl">
      {loading && (
        <span
          aria-label="loading-screen"
          className="z-100 fixed w-2/4 h-3/4 bg-gray-300 bg-opacity-80 rounded-lg"
        >
          <span className="flex justify-center items-center h-full animate-spin">
            <RiLoader4Line
              aria-label="loading-spinner"
              className="w-10 h-10 text-primary-500"
            />
          </span>
        </span>
      )}
      <div className="flex flex-col mt-8 w-full h-full items-center">
        <h1 aria-label="exchange-header-text">La Coco Crypto Exchange</h1>
        <DateAndTime />
        <div className="flex justify-around w-full h-2/4">
          <span className="flex flex-col items-center justify-around bg-primary-300 w-5/12 h-4/5 rounded-lg mt-8">
            <h2 aria-label="swap-token-text">Token to swap</h2>
            <Select
              aria-label="swap-token-select"
              list={supportedTokensId}
              action="swap"
              onChange={swapTokenOnChange}
              optionToDisable={receiveToken}
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
              optionToDisable={swapToken}
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
        </div>
        {conversionPrice && (
          <h2
            aria-label="conversion-price"
            className="h-1/6 w-4/5 flex justify-center"
          >
            1{conversionSwapSymbol} = {conversionPrice}
            {conversionReceiveSymbol}
          </h2>
        )}
      </div>
    </div>
  );
};

export default Exchange;
