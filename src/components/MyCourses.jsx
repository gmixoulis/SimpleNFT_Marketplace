import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import CardList from "./CardListCourse";
import Header from "./Navbar";
import { GetTokens } from "../hooks/Fetchers";
import { useQuery } from "react-query";
import CheckChain from "../hooks/CheckChain";
import { HasToken } from "../hooks/hasToken";
import { useAccount } from "wagmi";
import { RingLoader } from "react-spinners";
import { useWeb3Modal } from "@web3modal/react";

export default function MyCourses() {
  const [data1, updateData] = useState("");
  const { address } = useAccount();
  const { data } = useQuery("tokens", () => GetTokens());

  const [loading, setLoading] = useState(false);

  const { open } = useWeb3Modal();
 
  useEffect(() => {
    // initiate web3modal

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  async function GetAllNFTs() {
    await CheckChain();

    if (await HasToken()) {
      updateData(data);
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
    } catch (error) {
      console.error(error);
    }
  }
  const cachedProviderName = JSON.parse(
    localStorage.getItem("wagmi.connected")
  );

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if (cachedProviderName) GetAllNFTs();
  }, []);
  return (
    <div id="home">
      <Header />
      <>
        <div
          style={{
            position: "relative",
            minHeight: "78vh",
          }}
        >
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
              {data1.length === 0 && cachedProviderName ? (
                <div className="flex flex-col w-full h-auto pt-8 mt-11">
                  <div className="responsive">
                    <div className="pt-6 md:px-4 sm:px-12 mb-14">
                      <h1 className="md:text-medium text-[2rem] font-bold text-gray-600">
                        MY COURSES
                      </h1>
                    </div>
                    <div className="container flex flex-col m-auto mb-20 display-contents md:mx-auto lg:mx-auto">
                      <img
                        style={{
                          width: "20%",
                          height: "10%",
                          marginLeft: "3vmin",
                        }}
                        src="/no-access.png"
                        alt=""
                      ></img>
                      <br></br>
                      <p className="flex pl-[2vw] font-bold text-h1 text-[25px]">
                        No courses found
                      </p>
                    </div>
                    <div className="min-h-[5vh]" />
                  </div>
                  <div className="w-screen pt-8 pb-14 text-textgray bg-unic">
                    <div className="grid justify-between grid-cols-1 responsive md:grid-cols-2 gap-x-10 font-h1">
                      <div className="max-w-lg">
                        <h1 className="text-small text-left md:text-[1.5rem]">
                          ACCESS TO COURSES IS TOKEN GATED
                        </h1>
                        <br />
                        <h2 className="text-small font-thin text-left md:text-[1rem]">
                          It looks like you do not have any NFT tokens related
                          to courses in your selected wallet.
                        </h2>
                      </div>
                      <div
                        className="pt-6 md:pt-6 object-contain text-center w-[80%]
                                    md:ml-auto mr-0 ml-0 justify-self-center md:justify-self-stretch"
                      >
                        <button
                          className="float-left h-12 text-sm font-bold bg-white rounded-lg hover:bg-transparent font-p md:text-xs w-fit border-textgray hover:border-black text-textgray hover:text-black"
                          onClick={switchAccount}
                        >
                          SWITCH WALLET
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full h-auto pt-8 mt-11">
                  <div className="responsive">
                    <div className="pt-6 md:px-4 sm:px-12 mb-14">
                      <h1 className="md:text-medium text-[2rem] font-bold text-gray-600">
                        MY COURSES
                      </h1>
                    </div>

                    <div className="" />

                    <div className="flex flex-col items-center text-center">
                      {!address || !data ? (
                        <>
                          <div className="container flex flex-col mb-20 display-inline-block auto gr md:mx-auto lg:mx-auto">
                            <img
                              className=" w-[25%] pl-5 col-span-1 row-span-4 py-10 pt-6 text-center text-gray-500 text-small font-p"
                              src="/no-access.png"
                              alt=""
                            ></img>
                            <p className="flex pl-[2vw] font-bold text-h1 text-[25px]">
                              No courses found
                            </p>
                          </div>
                          <div className="mt-0">
                            <div className="w-screen pt-8 pb-14 text-textgray bg-unic">
                              <div className="grid justify-between grid-cols-1 responsive md:grid-cols-2 gap-x-10 font-h1">
                                <div className="max-w-lg">
                                  <h1 className="text-small text-left md:text-[1.5rem]">
                                    ACCESS TO COURSES IS TOKEN GATED
                                  </h1>
                                  <br />
                                  <h2 className="text-small font-thin text-left md:text-[1rem]">
                                    It looks like you do not have any NFT tokens
                                    related to courses in your selected wallet.
                                  </h2>
                                </div>
                                <div
                                  className="pt-7 md:pt-6 object-contain text-center w-[80%]
                                         md:ml-auto mr-0 ml-0 justify-self-center md:justify-self-stretch"
                                >
                                  <button
                                    className="float-left h-12 text-sm font-thin bg-white rounded-lg hover:bg-transparent font-p md:text-xs w-fit border-textgray hover:border-black text-textgray hover:text-black"
                                    onClick={() => open()}
                                  >
                                    CONNECT WALLET
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <CardList list={data1} />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <Footer />
      </>
    </div>
  );
}
