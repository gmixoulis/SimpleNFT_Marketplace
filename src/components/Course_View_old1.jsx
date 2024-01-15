import React, { Fragment, useState, useEffect } from "react";
import MarketplaceJSON from "../abis/course_mainet.json";
import Header from "./Navbar";
import Footer from "./Footer";

import CertificateDetails from "./Course_View_CrtDetails";
import Image from "./base/Image";
import "../index.css";
import { useLocation } from "react-router";
import Course_View_CrtDetails from "./Course_View_CrtDetails";
import { useNavigate } from "react-router-dom";
import urlify from "../hooks/urlify";
import { RingLoader } from "react-spinners";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { usePublicClient } from "wagmi";
import { getContract, getWalletClient } from "wagmi/actions";
import "react-responsive-modal/styles.css";
import Data from "../assets/data.json";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import classnames from "classnames";
import {
  FaRegTimesCircle,
  FaChevronDown,
  FaChevronUp,
  FaChevronRight,
} from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import Carousel from "./course_overview_components/CarouselInstructors";

const About = () => {
  const { state } = useLocation();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [dataFetched, updateFetched] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [showMore, setShowMore] = useState(false);

  const { address } = useAccount();
  const provider = usePublicClient();

  const contract = getContract({
    address: MarketplaceJSON.address,
    abi: MarketplaceJSON.abi,
    signerOrProvider: provider,
  });

  const { open } = useWeb3Modal();
  useEffect(() => {
    // initiate web3modal
    scrolltoId();
    GetNFT();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  function scrolltoId() {
    var access = document.getElementById("courses4");
    access.scrollIntoView();
  }

  const some_item = {
    semester: "",
    course: "PUNK 6529",
    image: require("../assets/instructors/punk6529.jpg"),
    description: `Punk6529 is among the world’s foremost collectors, investors and thought leaders in the NFT space, well-known for his extensive tweetstorms on NFTs and decentralization.  6529 is a leading advocate of the “open metaverse” – namely that the architecture of the metaverse should be decentralized and interoperable and, specifically, that NFTs could serve in this role.
6529 is active in several key areas: a) the 6529 Museum is a very extensive NFT museum, with a particular focus on generative art; b) 6529 Capital is a leading asset manager in the NFT space, and c) OM, which is building an open, decentralized metaverse.`,
  };

  const another_item = {
    semester: "",
    course: "Prof. GEORGE GIAGLIS",
    image: require("../assets/instructors/george-giaglis.jpg"),
    description: `Professor George M. Giaglis is the Executive Director of the Institute for the Future at the University of Nicosia. He teaches three MOOCs at UNIC: Introduction to Digital Currencies; Introduction to DeFi; NFTs and the Metaverse; and was instrumental in designing the curriculum of the world’s first academic programs in this space.
He has also been working with institutional and corporate clients, including the European Commission and the European Central Bank, on blockchain and technology monitoring projects, as well as advisor to a number of technology companies. He has published 12 books and more than 150 scientific papers, and is the Chief Editor of the Blockchain Technologies section at Frontiers in Blockchain.`,
  };
  const data = new Set();
  data.add(some_item);
  data.add(another_item);

  async function GetNFT() {
    let transaction;
    try {
      transaction = await contract.balanceOf(address);
    } catch (e) {
      console.log("not connected");
    }
    if (Number(transaction) > 0) {
      updateFetched(true);
    } else {
      updateFetched(false);
    }
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
      <Header />
      {/* #### RING LOADER ##### */}
      {loading ? (
        <div className="flex items-center justify-center h-screen containerClip">
          <br></br>
          <RingLoader
            color={"#d63636"}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />{" "}
        </div>
      ) : (
        // ##### RENDER PAGE #####
        <>
          <div id="courses4">
            <div className="responsive">
              <div className="pt-24 pb-16 course-hero" id="courses4">
                <div className="">
                  <Image
                    src={state.item.image}
                    tw_css="max-w-[25.5rem] h-auto max-h-[23.25rem]"
                  />
                </div>
                <div className="pt-8 text-gray-700 lg:pt-0">
                  <div className="lg:text-medium text-[2rem]">
                    <h1>
                      {state.item.course}: <br /> {state.item.cname}
                    </h1>
                  </div>
                  <div className="lg:text-medium text-[2rem] lg:pt-36 pt-14">
                    <h1>OVERVIEW</h1>
                    <p
                      className="text-textgray md:pt-6 leading-7 lg:text-[20px] text-[16px]"
                      dangerouslySetInnerHTML={{
                        __html: urlify(state.item.description),
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>

            {!address ? (
              // ##### WALLET NOT CONNECTED #####
              <div className="bg-unic">
                <div className="responsive">
                  <div className="grid lg:grid-cols-2 grid-cols-1 justify-items-stretch min-h-[8rem]">
                    <div className="self-center py-6 text-gray-700 font-h1">
                      <h1
                        id="aceestext1"
                        className="mt-8 mb-1 text-large md:text-[2rem] font-h1 text-textgray"
                      >
                        THIS COURSE IS TOKEN GATED
                      </h1>
                      <h2
                        id="aceestext2"
                        className="font-thin text-small md:text-small font-p text-textgray mb-14"
                      >
                        Connect your wallet to view course materials.
                      </h2>
                    </div>
                    <div className="pb-6 m-auto font-p lg:py-6">
                      <button
                        style={{
                          zIndex: "100",
                          float: "left",
                          height: "3.125rem",
                          maxHeight: "100%",
                        }}
                        className="px-5 ml-auto mr-2 text-sm font-bold text-center bg-white rounded-lg cursor-pointer hover:bg-transparent w-fit text-textgray text-small font-p border-textgray hover:border-black hover:text-black"
                        onClick={() => open()}
                      >
                        {" "}
                        CONNECT YOUR WALLET
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {!dataFetched ? (
                  <div className="bg-unic">
                    {/*  ##### WALLET CONNECTED _ NO TOKEN ##### */}
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
                                <div className="pl-4 mx-auto ">
                                  No Course Token found
                                </div>

                                <button
                                  className="text-black border-0 focus:outline-none"
                                  onClick={() => setOpenModal(false)}
                                >
                                  <FaRegTimesCircle className=" hover:text-gray-600" />
                                </button>
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="py-6 text-sm text-gray-500 border-t">
                                  {""}
                                </p>
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

                    <div className="responsive">
                      <div className="grid lg:grid-cols-2 grid-cols-1 justify-items-stretch min-h-[8rem]">
                        <div className="self-center py-6 text-gray-700 font-h1">
                          <h1
                            id="aceestext1"
                            className="mt-8 mb-1 text-large md:text-[2rem] font-h1 text-textgray"
                          >
                            THIS COURSE IS TOKEN GATED
                          </h1>
                          <h2
                            id="aceestext2"
                            className="font-thin text-small md:text-small font-p text-textgray mb-14"
                          >
                            Switch to wallet with a token to view course
                            materials.
                          </h2>
                        </div>
                        <div className="pb-6 m-auto font-p lg:py-6">
                          <React.Fragment>
                            <button
                              disabled={true}
                              style={{
                                zIndex: "100",
                                float: "left",
                                height: "3.125rem",
                                maxHeight: "100%",
                              }}
                              className="px-5 ml-auto mr-2 text-sm font-thin text-center bg-transparent rounded-lg w-fit text-textgray text-small font-p border-textgray hover:border-black hover:text-black"
                            >
                              {" "}
                              CONNECTED
                            </button>
                          </React.Fragment>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* ##### TOKEN CONNECTED - TOKEN OK ##### */}
                    <div className="bg-unic">
                      <div className="responsive py-28">
                        <h1 className="lg:text-medium text-[2rem] text-gray-700 py-2">
                          WHAT YOU WILL LEARN
                        </h1>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                          {Data.skills.map((skill) => (
                            <div
                              key={skill.id}
                              className="flex items-start py-2 font-light"
                            >
                              <span>
                                <GiCheckMark className="mt-1 mr-1" />
                              </span>

                              {skill.description}
                            </div>
                          ))}
                        </div>
                        {showMore ? (
                          <>
                            <div className="flex flex-col py-8">
                              {Data.extraContent.map(
                                ({ id, content, title }) => (
                                  <>
                                    <div className="flex flex-col pb-4 border-r-2 border-gray-400">
                                      <h1 className="text-base font-medium text-black">
                                        {title}
                                      </h1>
                                      <p className="font-light text-gray-700 text-small">
                                        {content}
                                      </p>
                                    </div>
                                  </>
                                )
                              )}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                        <div className="flex justify-start w-full ">
                          <button
                            className="text-base border-0 text-textgray hover:text-gray-800 hover:underline"
                            onClick={() => setShowMore(!showMore)}
                          >
                            {showMore ? (
                              <div className="flex items-center">
                                <div className="pr-2">Show less</div>
                                <span>
                                  <FaChevronUp />
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <div className="pr-2">Show more</div>
                                <span>
                                  <FaChevronDown />
                                </span>
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            {/* COURSE CONTENTS */}
            <div className="responsive my-28">
              <h1 className="font-bold text-textgray lg:text-medium text-[2rem] pb-0 lg:pb-2">
                COURSE CONTENTS
              </h1>
              <div className="border border-b-0 border-gray-500 rounded-none bg-unic lg:mt-2 border-x-0 border-t-1">
                {Data.courseContents.map((content) => (
                  <Disclosure as="div" key={content.id} className="">
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={classnames(
                            "flex w-full justify-between rounded-none bg-unic border-1 border-gray-500 border-t-0 px-4 py-4 hover:bg-gray-300 hover:duration-200 focus:outline-0",
                            { "bg-gray-300": open }
                          )}
                        >
                          <span className="text-base font-light text-black">
                            {content.chapterName}
                          </span>
                          <FaChevronDown
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-black`}
                          />
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel className="py-2 pl-8 font-light text-black border border-t-0 border-gray-500 text-small">
                            <ul className="list-disc">
                              {content.lessons.map(
                                ({
                                  id,
                                  lessonTitle,
                                  videoDuration,
                                  previewAvailable,
                                }) => (
                                  <li className="w-full px-0 py-1" key={id}>
                                    <div className="flex justify-between">
                                      <div>{lessonTitle}</div>
                                      <div className="flex items-center pr-4">
                                        {previewAvailable && (
                                          <button className="px-2 text-blue-500 border-none hover:text-blue-800">
                                            preview
                                          </button>
                                        )}

                                        <div className=" text-textgray">
                                          {videoDuration}
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                )
                              )}
                            </ul>
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>
            {/*CERTIFICATE DETAILS */}
            <div className="text-textgray bg-unic py-28">
              <CertificateDetails />
            </div>
            {/* INSTRUCTORS CAROUSEL */}
            <div className="py-28">
              <div className="responsive">
                <h1 className="font-bold text-textgray lg:text-medium text-[2rem] pb-2">
                  COURSE INSTRUCTORS
                </h1>
                <Carousel />
              </div>
            </div>
            {/* GUEST LECTURERS */}
            <div className="bg-unic">
              <div className="responsive py-28">
                <h1 className="md:text-medium text-[2rem] font-bold text-textgray py-4">
                  GUEST LECTURERS
                </h1>
                <div className="w-full h-[30rem] overflow-auto">
                  <div className="flex m-auto md:mx-auto lg:mx-auto">
                    <ul className="grid grid-cols-3 gap-2 sm:grid-cols-3 lg:grid md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-8 md:mx-auto lg:mx-auto">
                      {Data.guestSpeakers.map(({ name, title, job }, idx) => (
                        <li
                          key={idx}
                          className="col-span-1 row-span-3 py-10 pt-6 pb-10 text-lg font-bold"
                        >
                          <img
                            src={"/instructors/punk6529.jpg"}
                            className="border-2 border-black rounded-lg"
                            alt=""
                          />
                          <div className="text-center md:text-left">
                            <p className="font-light text-textgray text-small">
                              {name}
                            </p>
                            <p className="font-light text-textgray text-small">
                              {title}
                            </p>
                            <p className="font-light text-textgray text-small">
                              {job}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="w-full py-10 ">
              <div className="my-5 responsive">
                <h1 className="font-bold text-textgray lg:text-medium text-[2rem] pb-2">
                  FREQUENTLY ASKED QUESTIONS
                </h1>
                {Data.faq.map(({ id, question, answer }) => (
                  <Disclosure as="div" key={id} className="pb-6">
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={classnames(
                            "flex items-center w-full rounded-none bg-gray-50 border-1 border-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 hover:duration-200 focus:outline-0 focus:ring-0",
                            { "border-b-0": open }
                          )}
                        >
                          <FaChevronRight
                            className={`${
                              open ? "rotate-90 transform duration-300" : ""
                            } text-textgray`}
                          />

                          <span className="px-2 font-light text-textgray">
                            {question}
                          </span>
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-300 ease-out"
                          enterFrom="transform scale-100 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel className="px-4 py-2 font-light border border-t-0 border-gray-300 bg-gray-50 text-textgray">
                            {answer}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default About;
