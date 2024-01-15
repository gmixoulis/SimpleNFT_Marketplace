import React, { useState, useEffect } from "react";
import MarketplaceJSON from "../abis/course_mainet.json";
import CertificateJson from "../abis/certificate-contract.json";
import Header from "./Navbar";
import Footer from "./Footer";
import Image from "./base/Image";
import CardListCourse from "./CardListCourse";

import "../index.css";
import { useLocation } from "react-router";
import { RingLoader } from "react-spinners";
import { useAccount, readContracts } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import "react-responsive-modal/styles.css";
import Data from "../assets/data.json";

import data1 from "../abis/data.json";
import Countdown from "react-countdown";
import { ReactComponent as OpenSeaIcon } from "../assets/opensea.svg";
import { ReactComponent as EtherscanIcon } from "../assets/etherscan.svg";
import AccessGranted from "./course_overview_components/AccessGranted";
import TokenGated from "./course_overview_components/TokenGated";
import CertificateView from "./course_overview_components/ModalConfigure";
import FAQ from "./course_overview_components/FAQ";

const CourseView = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [tokenId, setTokenId] = useState(0);
  const [dataFetched, updateFetched] = useState(false);
  const [certificated, setCertificated] = useState(false);

  const { address } = useAccount();

  const { open } = useWeb3Modal();
  useEffect(() => {
    // initiate web3modal
    scrolltoId();
    GetNFT();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 4000);
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
  const replacer = (key, value) =>
    typeof value === "bigint" ? value.toString() : value;

  async function GetNFT() {
    let transaction;
    let certificate;

    let data;

    try {
      data = await readContracts({
        contracts: [
          {
            address: MarketplaceJSON.address,
            abi: MarketplaceJSON.abi,
            functionName: "balanceOf",
            args: [address],
          },
          {
            address: CertificateJson.address,
            abi: CertificateJson.abi,
            functionName: "balanceOf",
            args: [address],
          },
        ],
      });
      console.log("data", data);
      transaction = JSON.stringify(data[0].result, replacer);
      certificate = JSON.stringify(data[1].result, replacer);

      //transaction = await contract.balanceOf(address);
      //certificate = await certificateContract.balanceOf(address);
    } catch (e) {
      console.log("not connected");
    }
    if (transaction >= '"1"' && certificate >= '"1"') {
      updateFetched(true);
      setCertificated(true);
    } else if (transaction >= '"1"' && certificate <= '"0"') {
      updateFetched(true);
      setCertificated(false);
    } else {
      updateFetched(false);
    }
  }
  const options = { method: "GET", headers: { accept: "application/json" } };
  try {
    fetch(
      `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.REACT_APP_ALCHEMY_API}/getNFTs?owner=${address}&contractAddresses[]=0xc5618106b3bfb2319017a3682bc79c7af0a517a7&withMetadata=false`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setTokenId(Number(response["ownedNfts"][0]["id"]["tokenId"]))
      )
      .catch((err) => {
        setTokenId(0);
      });
  } catch (e) {
    setTokenId(0);
  }
  const Completionist = () => <span>The course has started!</span>;

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      return (
        <p className="ml-auto font-bold text-textgray font-p ">
          {" "}
          Time remaining: {days}D:{hours}H:{minutes}M:{seconds}S
        </p>
      );
    }
  };

  return (
    <>
      <Header />
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
        <>
          <div id="courses4">
            <div className="responsive">
              <div className="pt-24 pb-10 course-hero" id="courses4">
                <div className="">
                  <Image
                    src={data1.image}
                    tw_css="max-w-[25.5rem] h-auto max-h-[23.25rem]"
                  />
                  <br />
                  <div>
                    <p className="text-small">
                      {" "}
                      Semester: {data1.semester} <br />
                      Year: 2022 <br />
                      {/* Available Positions: {data1.availablePosotions} <br /> */}
                      Duration: 12 Weeks
                      <br />
                      Enrolment fee: Free to attend <br />
                      Prerequisites: {data1.prerequisites}
                      <br />
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
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
                <div className="pt-8 text-gray-700 lg:pt-0">
                  <div className="lg:text-medium text-[2rem]">
                    <h1>
                      META-511: <br /> NFTs and the Metaverse
                    </h1>
                  </div>
                  <div className="lg:text-medium  text-[2rem] ">
                    <p className="text-textgray md:pt-6 leading-7 lg:text-[20px] text-[16px]"></p>
                  </div>
                  <div className="top-0 flex flex-wrap items-center">
                    <div className="float-left w-2/3">
                      <ul className="flex float-left gap-1 mt-1 bg-center ">
                        {data1.skills.map((item, index) => (
                          <li key={index} className=" text-[15px] pl-0 font-p">
                            <span className="inline-flex items-center px-2 font-thin rounded-md text-textgray text-p bg-gray-50 ring-1 ring-inset ring-gray-500/10">
                              {item}
                            </span>{" "}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:text-medium text-[2rem] lg:pt-26 pt-10">
                      <h1>OVERVIEW</h1>
                      <p
                        className="text-textgray md:pt-6 leading-7 lg:text-[20px] text-[16px]"
                        // dangerouslySetInnerHTML={{
                        //   __html: urlify(state.item.description),
                        // }}
                      >
                        An open introductory course to NFTs and the Metaverse,
                        delivered on-chain and in the metaverse. The University
                        of Nicosia (UNIC) has been a leader in cryptocurrency
                        education and research since 2014, when it taught the
                        world’s first for-credit cryptocurrency course. This
                        course is taught by UNIC faculty and @punk6529 – a
                        deeply influential thinker on NFTs and the metaverse and
                        one of the largest NFT collectors in the world – along
                        with an incredible array of guest panelists and
                        lecturers.
                      </p>
                      <p className="text-textgray  leading-7 lg:text-[20px] text-[16px]">
                        {" "}
                        More details:{" "}
                        <a
                          className="underline"
                          href="https://www.unic.ac.cy/openmetaverse/mooc-nfts-metaverse/"
                          target="_blank"
                        >
                          here
                        </a>
                      </p>
                    </div>
                    {new Date() > Date.parse(data1.dataStart) ? (
                      <div className="container grid text-left items-left">
                        <div className="row">
                          <div className="m-auto font-p lg:py-6">
                            <button
                              className=" w-[8.5rem] h-[2.5rem] items-center text-gray-200 border-0 bg-gray-600 px-4 py-2 font-medium  tracking-wide rounded-xl hover:bg-gray-800 hover:text-white duration-200"
                              onClick={() => open()}
                            >
                              {" "}
                              CLAIM
                            </button>
                          </div>
                        </div>
                        <div className="row ">
                          {" "}
                          <Countdown
                            className="cursor-default "
                            date={data1.dataStart}
                            renderer={renderer}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        {!address ? (
                          <TokenGated connected={false} />
                        ) : (
                          <>
                            {!dataFetched ? (
                              <>
                                <TokenGated connected={true} />
                              </>
                            ) : (
                              <>
                                <AccessGranted state={state} />
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <CertificateView
              tokenId={tokenId}
              hasToken={certificated ? true : false}
              Data={data1}
              address={address}
            />
            <div className="responsive text-textgray py-14">
              <div className="">
                <h1 className="font-bold text-textgray lg:text-medium text-[2rem] pb-3">
                  COURSE INSTRUCTORS
                </h1>
              </div>
              <div>
                <CardListCourse disabled list={Array.from(data)} />
              </div>
            </div>
            <FAQ Data={Data} />
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default CourseView;
