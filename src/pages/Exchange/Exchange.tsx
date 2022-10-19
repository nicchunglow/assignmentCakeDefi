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
    (receiveAmount / swapAmount).toFixed(5);

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

  const handleSwapButton = () => {
    setSwapAmount(previousReceiveAmount.current);
    setReceiveAmount(previousSwapAmount.current);
    const previousSwapToken = swapToken;
    setSwapToken(receiveToken);
    setReceiveToken(previousSwapToken);
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
    try {
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
    } catch (err: any) {
      throw new Error(err.message);
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
    <div className="flex justify-center rounded-lg w-full sm:w-3/4 lg:w-2/4 h-full lg:h-5/6 bg-white shadow-2xl">
      {loading && (
        <span
          aria-label="loading-screen"
          className="z-100 fixed top-0 w-full h-full bg-gray-300 bg-opacity-80 rounded-lg"
        >
          <span className="flex justify-center items-center h-full animate-spin">
            <RiLoader4Line
              aria-label="loading-spinner"
              className="w-10 h-10 text-primary-500"
            />
          </span>
        </span>
      )}
      <div className="flex flex-col mt-8 w-full items-center">
        <h1 aria-label="exchange-header-text" className="text-2xl sm:text-3xl">
          La Coco Crypto Exchange
        </h1>
        <DateAndTime />
        <div className="flex justify-around flex-wrap w-full lg:h-4/6">
          <span className="flex flex-col items-center justify-around shadow-2xl bg-primary-200 w-80 lg:w-60  h-60 lg:h-4/5 rounded-lg mt-8">
            <h2 aria-label="swap-token-text">Token to swap</h2>
            <Select
              aria-label="swap-token-select"
              list={supportedTokensId}
              action="swap"
              onChange={swapTokenOnChange}
              optionToDisable={receiveToken}
              value={swapToken}
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
          <span className="flex flex-col items-center justify-around shadow-2xl bg-primary-200 w-80 lg:w-60 h-60 lg:h-4/5 rounded-lg mt-8">
            <h2 aria-label="receive-token-text">Token to Receive</h2>
            <Select
              aria-label="receive-token-select"
              list={supportedTokensId}
              action="receive"
              onChange={receiveTokenOnChange}
              optionToDisable={swapToken}
              value={receiveToken}
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
        <span className="flex flex-col w-full mt-10 items-center">
          <button
            aria-label="swap-button"
            onClick={handleSwapButton}
            disabled={!conversionPrice}
            className="rounded-lg h-14 w-60 disabled:bg-gray-100 disabled:text-gray-300 bg-secondary-300 hover:bg-secondary-200 active:bg-secondary-100 text-white text-lg font-thin"
          >
            SWAP
          </button>
          {conversionPrice && (
            <h2
              aria-label="conversion-price"
              className="h-1/6 w-4/5 flex justify-center"
            >
              1{conversionSwapSymbol} = {conversionPrice}
              {conversionReceiveSymbol}
            </h2>
          )}
        </span>
      </div>
    </div>
  );
};

export default Exchange;
