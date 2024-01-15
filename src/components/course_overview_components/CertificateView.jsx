import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaRegTimesCircle } from "react-icons/fa";
import { useWeb3Modal } from "@web3modal/react";
import Countdown from "react-countdown";
import Image from "../base/Image";
import Certificate from "../../assets/certificate1.png";
import { ReactComponent as OpenSeaIcon } from "../../assets/opensea.svg";
import { ReactComponent as EtherscanIcon } from "../../assets/etherscan.svg";
import { FaLink, FaChevronUp, FaChevronDown } from "react-icons/fa";

const CertificateView = ({ Data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [expand, setExpand] = useState(false);
  const { open } = useWeb3Modal();
  const date = new Date("2024-01-01");
  const contract_addresss = "0x....45";
  const Completionist = () => <span>The course has started!</span>;

  const rendererOfBurn = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      return (
        <p disabled className="text-[15px] md:pl-[-5px] font-p">
          {" "}
          {days}D:{hours}H:{minutes}M:{seconds}S
        </p>
      );
    }
  };
  return (
    <div className="text-textgray bg-unic py-28">
      <Transition appear show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="box-border fixed inset-0 z-20 pt-12 overflow-y-auto "
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
              <div className="inline-block w-full md:w-[55vw]  p-6 my-8 overflow-x-hidden align-middle transition-all transform bg-white shadow-xl   first-letter:w-full rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="sticky flex items-center justify-between text-base font-medium leading-6 text-gray-900 "
                >
                  <div className="pl-4 mx-auto ">Claim your Certificate!</div>

                  <button
                    className="text-black border-0 focus:outline-none"
                    onClick={() => setOpenModal(false)}
                  >
                    <FaRegTimesCircle className=" hover:text-gray-600" />
                  </button>
                </Dialog.Title>
                <div className="mt-2 ">
                  <p className="py-2 text-sm text-gray-500 border-t">{""}</p>
                </div>

                <div className=" grid lg:flex lg:flex-wrap md:w-[52vw] md:pl-5">
                  <div className="lg:w-1/2 ">
                    {" "}
                    <div className="text-left">
                      <a href="https://opensea.io" target="blank">
                        {" "}
                        <Image
                          src={Data.image}
                          tw_css="max-w-[18.5rem] hover:opacity-80 h-auto max-h-[18.25rem]"
                        />
                      </a>

                      <br />
                      <button
                        className="text-gray-200   h-[2.5rem]  border-0 bg-gray-600 px-3 py-2 font-medium text-base tracking-wide rounded-xl hover:bg-gray-800 hover:text-white duration-200"
                        onClick={() => {}}
                      >
                        Claim
                      </button>
                      <br />
                      <br />
                      <div className="flex text-left ">
                        <div className="pr-1 md:w-1/3">
                          <p className="text-[13px]"> Closes in:</p>
                          <p className="text-[13px] pt-2"> Price: 0.25ETH</p>
                          <p className="text-[13px] pt-2">
                            {" "}
                            Contract Address <br />
                            <button
                              className="flex items-center border-none hover:text-black font-p text-textgray"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  contract_addresss
                                );
                              }}
                            >
                              {" "}
                              {contract_addresss} <FaLink />
                            </button>
                          </p>

                          <p className="text-[12px] pt-2">
                            Year: {Data.year} <br />
                          </p>
                        </div>
                        <div className=" md:w-2/3 md:pr-[10vw]">
                          <p className="text-[12px] ">
                            <Countdown
                              date={Data.dataStart}
                              renderer={rendererOfBurn}
                            />{" "}
                          </p>

                          <p className="text-[13px] pt-1">
                            {" "}
                            Total Minted: {Data.availablePosotions}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="pt-8 text-left text-gray-700 lg:pt-0">
                      <div className="lg:text-medium text-[2rem]">
                        <h1>Details</h1>
                      </div>
                      <div className="lg:text-medium  text-[2rem] text-left ">
                        <p className="text-textgray md:pt-6 leading-7 lg:text-[16px] text-[14px]">
                          Title:{" "}
                        </p>

                        <p className="text-textgray md:pt-6 leading-7  lg:text-[16px] text-[14px]">
                          Deployer:{" "}
                        </p>
                      </div>
                      <br />
                      <div className=" text-[2rem]">
                        <h1>Overview</h1>
                        <p className="text-textgray w-[80vw] lg:w-[90%] text-[15px] overflow-y-auto h-[18vh] ">
                          {Data.description}
                        </p>
                      </div>
                      <div className="flex items-center mt-4 lg:absolute">
                        <a
                          href="https://opensea.io/collection/unicaccess"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mr-2"
                        >
                          <OpenSeaIcon className="w-8 h-8" />
                        </a>
                        <a
                          href="https://etherscan.io/address/0x3ad059E4a22931E3658e69c44f36eD561DD5Df17"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <EtherscanIcon className="w-8 h-8" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <h1 className="responsive tracking-wide mb-6 font-bold text-textgray lg:text-medium text-[2rem] pb-0 lg:pb-2">
        CERTIFICATE DETAILS
      </h1>
      <div className="grid grid-cols-1 responsive lg:grid-cols-2 lg:gap-20">
        {/* COLUMN 1 */}
        <div>
          <img src={Certificate} alt="Certificate" className="w-[35rem]" />
        </div>
        {/* COLUMN 2 */}
        <div className="flex flex-col lg:items-start">
          <div className="flex flex-col ">
            <div>
              <p className="text-gray-800 text-[1.1rem]">
                Redeem: <span className="font-light"> claim</span>
              </p>
              <p className="text-gray-800 text-[1.1rem]">
                Price:<span className="font-light"> 0.25 Ξ + gas fees</span>
              </p>
              <p className="text-gray-800 text-[1.1rem]">
                Eligibility:
                <span className="font-light text-[1.1rem]"> Pass-grade</span>
              </p>
              <p className="text-gray-800 text-[1.1rem]">
                Token Standard:
                <span className="font-light"> ERC-721</span>
              </p>
              <p className="text-gray-800 text-[1.1rem]">
                Blockchain:<span className="font-light"> Ethereum </span>
              </p>
            </div>
          </div>
          <div className="flex items-start pt-4 lg:grid lg:grid-cols-2 lg:gap-4">
            <div>
              <div className="w-[8.5rem] h-[2.5rem] grid grid-cols-7 justify-between">
                <button
                  onClick={() => setOpenModal(true)}
                  className="text-gray-200 mx-10 lg:flex lg:items-center lg:mx-auto justify-center h-[2.5rem] w-[6.5rem] border-0 bg-gray-600 px-4 py-2 font-medium text-base tracking-wide rounded-xl hover:bg-gray-800 hover:text-white duration-200"
                >
                  VERIFY
                </button>
                {/* <button className="col-span-5 text-base font-medium tracking-wide text-gray-200 duration-200 bg-gray-600 border-0 rounded-xl hover:bg-gray-800 hover:text-white">
                  CLAIM
                </button> */}
                {/* {expand ? (
                  <button
                    onClick={() => setExpand(!expand)}
                    className="col-span-2 text-gray-200 duration-200 bg-gray-600 rounded-l-none rounded-r-xl border-y-0 hover:bg-gray-800 hover:text-white"
                  >
                    <FaChevronUp size={20} className="mx-auto" />
                  </button>
                ) : (
                  <button
                    onClick={() => setExpand(!expand)}
                    className="col-span-2 text-gray-200 duration-200 bg-gray-600 rounded-l-none rounded-r-xl border-y-0 hover:bg-gray-800 hover:text-white"
                  >
                    <FaChevronDown size={20} className="mx-auto" />
                  </button>
                )} */}
              </div>
              {/* {expand ? (
                <button className="flex items-center px-4 py-2 my-1 text-base font-medium tracking-wide text-gray-200 duration-200 bg-gray-600 border-0 rounded-xl hover:bg-gray-800 hover:text-white">
                  DELEGATE
                </button>
              ) : (
                <></>
              )} */}
            </div>

            {/* <div className="w-[8.5rem] h-[2.5rem] grid grid-cols-7 justify-between">
              <button className="col-span-5 text-base font-medium tracking-wide text-gray-200 duration-200 bg-gray-600 border-0 rounded-r-none rounded-l-xl hover:bg-gray-800 hover:text-white">
                CLAIM
              </button>
              {expand ? (
                <button
                  onClick={() => setExpand(!expand)}
                  className="col-span-2 text-gray-200 duration-200 bg-gray-600 rounded-l-none rounded-r-xl border-y-0 hover:bg-gray-800 hover:text-white"
                >
                  <FaChevronUp size={20} className="mx-auto" />
                </button>
              ) : (
                <button
                  onClick={() => setExpand(!expand)}
                  className="col-span-2 text-gray-200 duration-200 bg-gray-600 rounded-l-none rounded-r-xl border-y-0 hover:bg-gray-800 hover:text-white"
                >
                  <FaChevronDown size={20} className="mx-auto" />
                </button>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateView;
