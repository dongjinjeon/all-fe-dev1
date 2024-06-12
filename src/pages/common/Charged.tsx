import { Header } from "@components/Header";

import { ReactComponent as CircleC } from "@svg/CircleC.svg";
import { useTranslation } from "react-i18next";

import { Footer } from "@components/Footer";
import { UserContext } from "@context/UserContext";
import React, {Key, useCallback, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ReactComponent as ChevronLeftIcon} from "@svg/ChevronLeft.svg";
import {ReactComponent as ChevronRightIcon} from "@svg/ChevronRight.svg";
import PaymentDetailPopup from "@components/Popup/PaymentDetail";

export const Charged = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {userId, chargeLog, getChargeLog, chargeLogCnt, session_token} = useContext(UserContext);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any>(chargeLog);
  const [isOpen, setIsOpen] = useState<any>(undefined);
  const [selectedItem, setSelectedItem] = useState<any>(undefined);

  useEffect(() => {
    getChargeLog({ page: page, count: 5, token: session_token });
  }, [page]);

  useEffect(() => {
    if(chargeLogCnt === 0) {
      setPage(prev => prev - 1)
    } else {
      setData(chargeLog)
    }
  }, [chargeLog]);

  const clickNext = useCallback(() => {
    if(data.length >= 5) {
      setPage(page + 1);
    }
  }, [data]);

  useEffect(() => {
  }, [chargeLog])

  useEffect(() => {
    if (userId && userId <= -1) navigate("/login");
  }, []);

  return (
    <div className="">
      {isOpen && (
          <PaymentDetailPopup isOpen={isOpen} setIsOpen={setIsOpen} selectedItem={selectedItem} />
      )}
      <div className="h-[10rem] max-lg:h-[6rem]">
        <Header/>
      </div>
      <div className="flex flex-col">
        <div className="mx-auto max-w-[1200px] w-full px-[8rem] max-header:px-4">
          <div
            className="text-center mt-1 text-sm"
            style={{
              fontFamily: "'Noto Sans KR', sans-serif",
            }}
          >
            <div className="relative flex flex-row mb-8">
              <div className="flex flex-row leading-24 justify-center items-center">
                <p className="text-black font-bold text-2xl">충전내역</p>
              </div>
            </div>
            <div className="w-full" style={{border: "1px solid #D0D0D0"}}/>
            {data?.map((item: any, index: number) => {
              return (
                <Content key={index} item={item} setIsOpen={setIsOpen} setSelectedItem={setSelectedItem} />
              );
            })}
          </div>
          <div className="flex ml-auto my-3 flex-row w-24">
            <button
              className="bg-[#F7F7F7] px-2 py-2 rounded-[8px] border-[2px] border-solid ml-auto font-notokr text-[16px] font-medium text-[#757575]"
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              className="bg-[#F7F7F7] px-2 py-2 rounded-[8px] border-[2px] border-solid ml-auto font-notokr text-[16px] font-medium text-[#757575]"
              onClick={() => clickNext()}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="h-24" />
      <Footer />
    </div>
  );
};
interface IChargeList{
  item: any;
  setIsOpen: Function;
  setSelectedItem: Function;
}

const Content = ({item, setIsOpen, setSelectedItem}: IChargeList) => {
  return (
    <div style={{ cursor: 'pointer' }} onClick={() => {
      setSelectedItem(item);
      setIsOpen(true)
    }}>
      <div className="flex flex-row items-center my-3 px-4">
        <div className="flex mr-5">
          <CircleC />
        </div>
        <div className="flex flex-row w-full max-sm:flex-col">
          <div className="flex flex-col font-notokr text-left gap-1">
            <div className="flex flex-wrap text-lg">
              ContentCoin 충전&nbsp;
              <div>({item?.default_coin + item?.bonus_coin} ContentCoin)</div>
            </div>
            <div className="text-[#D0D0D0]">{item.purchaseTime.split(" ")[0]}</div>
          </div>
          <div className="flex flex-1 items-center justify-end text-alco-mint text-xl max-sm:justify-start">{item.formattedPrice}</div>
        </div>
      </div>
      <div className="w-full" style={{ border: "1px solid #D0D0D0" }} />
    </div>
  );
};
