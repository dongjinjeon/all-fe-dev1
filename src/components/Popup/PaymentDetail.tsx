import { ReactComponent as Logo } from "@svg/LogoColor.svg";
import { ReactComponent as QR } from "@svg/QR.svg";
import { useAppSelector } from "@store";
import { UserContext } from "@context/UserContext";
import {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const PaymentDetailPopup = ({
  isOpen,
  setIsOpen,
  selectedItem,
}: {
  isOpen: any;
  setIsOpen: any;
  selectedItem: any;
}) => {
  const navigate = useNavigate();

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(">>>>>>> selectedItem", selectedItem);
  }, []);

  return (
    <div className="fixed top-0 right-0 flex justify-center items-center w-full h-screen z-30">
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-30"></div>
      <div
          className="border border-black border-4 border-solid relative font-notokr bg-white rounded-md shadow-lg z-40 w-96 bg-gray-100">
        <div className="h-12 bg-alco-mint flex px-[1.5rem]">
          <div className="font-notokr text-white font-bold my-auto">
            충전 상세 내역
          </div>
          <button
              onClick={handleClosePopup}
              className="absolute top-0 right-0 p-2"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400 hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-[1.5rem] py-3">
          <div className=" gap-4 flex flex-col">
            <div>충전방법: {selectedItem.type}</div>
            <div>충전일시: {selectedItem.purchaseTime}</div>
            <div>결재금액: {selectedItem.formattedPrice}</div>
            <div>충전코인: {selectedItem.default_coin} ContentCoin</div>
            <div>보너스코인: {selectedItem.bonus_coin} ContentCoin</div>
          </div>
          <div className="leading-[1.2rem] py-5">
            <div
                className="text-left font-normal text-[#757575] text-[10px]"
            >
              <p>
                • 이미 사용한 코인은 결재취소할 수 없습니다.
              </p>
              <p>
                • 인앱결재한 코인은 앱에서만 취소가능합니다.
              </p>
              <p>
                • 결제취소에 대한 자세한 문의는 [고객 지원] 페이지에서 문의해주시기 바랍니다.
              </p>
            </div>
            {selectedItem.type === 'inapp' ? (
                <button
                    className="flex disabled cursor-default w-full h-7 mt-5 bg-gray-400 font-thin text-white font-notokr rounded-[8px]  justify-center items-center ml-auto"
                >
                  {"앱에서만 취소가능합니다."}
                </button>
                ) : (
                <button
                    className="flex w-full h-7 mt-5 bg-alco-mint font-thin text-white font-notokr rounded-[8px]  justify-center items-center ml-auto"
                >
                  {"결제취소하기"}
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailPopup;
