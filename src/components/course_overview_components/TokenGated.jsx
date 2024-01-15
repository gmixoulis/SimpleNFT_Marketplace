import React, { useState, Fragment, useEffect } from "react";
import { useWeb3Modal } from "@web3modal/react";
import "react-responsive-modal/styles.css";
import { Dialog, Transition } from "@headlessui/react";
import { FaRegTimesCircle } from "react-icons/fa";
const TokenGated = ({ connected }) => {
  const { open } = useWeb3Modal();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setOpenModal(connected);
  }, []);
  let subtitle;
  let buttonText;

  if (connected) {
    subtitle = "Switch to wallet with a token to view course materials.";
    buttonText = "CONNECTED";
  } else {
    subtitle = "Connect your wallet to view course materials.";
    buttonText = "CONNECT";
  }

  async function switchAccount() {
    try {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Transition appear show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-20 overflow-y-auto"
          onClose={() => setOpenModal(false)}
        >
          <div className="min-h-screen px-4 text-center bg-gray-400 bg-opacity-50">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="flex items-center justify-between text-base font-medium leading-6 text-gray-900"
                >
                  <div className="pl-4 mx-auto ">No Course Token found</div>

                  <button
                    className="text-black border-0 focus:outline-none"
                    onClick={() => setOpenModal(false)}
                  >
                    <FaRegTimesCircle className=" hover:text-gray-600" />
                  </button>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="py-6 text-sm text-gray-500 border-t">{""}</p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm duration-300 bg-gray-700 border border-transparent rounded-md text-unic hover:bg-gray-500 hover:text-unic"
                    onClick={switchAccount}
                  >
                    Switch Wallet
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <div className="md:grid lg:flex lg:flex-wrap w-[50vw] ">
        <div className="md:w-2/3 md:object-contain">
          <h1
            id="aceestext1"
            className="md:mt-8 mb-1 text-medium md:text-[1.4vw] font-h1 text-textgray"
          >
            THIS COURSE IS TOKEN GATED
          </h1>
          <h2
            id="aceestext2"
            className="font-thin text-small md:text-small font-p text-textgray mb-14"
          >
            {subtitle}
          </h2>
        </div>
        <div className="w-2/3 lg:w-1/3 lg:mt-8">
          <button
            className=" h-[5vh] w-full text-[3vw]  lg:w-[13vw] lg:text-[1vw]  content-center  text-gray-200 border-0 bg-gray-600 px-4 py-2 font-medium  tracking-wide rounded-xl hover:bg-gray-800 hover:text-white duration-200 "
            onClick={() => open()}
          >
            {" "}
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default TokenGated;
