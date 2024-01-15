import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import CardList2 from "./CardListProfile";
import Header from "./Navbar";
import CheckChain from "../hooks/CheckChain";

import axios from "axios";
import { BACKEND_URL } from "../components/base/constants";
import ClaimContract from "../abis/marketplace.json";
import { RingLoader } from "react-spinners";
import { useWeb3Modal } from "@web3modal/react";
import NotFound from "./404";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";

export default function MyProfile() {
  const [data2, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  //const { data } = useQuery("nfts", () => getAllNFTs());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // initiate web3modal
    if (!dataFetched) getNFTData();

    setLoading(true);
    //setTimeout(() => {
    // setLoading(false);
    //}, []);
  }, []);
  const EmptyState = () => {
    return <NotFound />;
  };

  const { address } = useAccount();

  async function getNFTData() {
    await CheckChain();

    let j;
    let data;
    const replacer = (key, value) =>
      typeof value === "bigint" ? value.toString() : value;
    let data4 = [];
    let transaction;

    await axios
      .get(BACKEND_URL + "/nfts/get_nfts/" + ClaimContract.address, {})
      .then(async (response) => {
        data = response.data.nft_values;
        if (!address) {
          setLoading(false);
          return;
        }
        for (var i = 0; i <= data.length; i++) {
          j = i + 1;
          let contract = await readContract({
            address: ClaimContract.address,
            abi: ClaimContract.abi,
            functionName: "balanceOf",
            args: [address, j],
          });

          transaction = JSON.stringify(contract, replacer);
          if (transaction >= '"1"' && !data4.includes(data[i])) {
            data4.push(data[i]);
          }
        }
        const data3 = [...new Set(data4)];
        updateFetched(true);
        setLoading(false);
        updateData(data3);
      })
      .catch((error) => {
        console.log(error);
        EmptyState();
      });

    //updateData(data.filter((entry) => !entry.name.includes("Final Exam")))
    //console.log(data);
  }
  const { open } = useWeb3Modal();

  //const params = useParams();
  //const tokenId = params.tokenId;
  //if (!dataFetched) getNFTData();
  //const {account} = useEthers();

  async function connectWallet() {
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
  return (
    <div id="home">
      <Header />
      <>
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
            <div
              style={{
                position: "relative",
                minHeight: "50vh",
              }}
            >
              {data2.length === 0 && cachedProviderName ? (
                <div className="flex flex-col w-full h-auto pt-8 mt-11">
                  <div className="responsive">
                    <div className="pt-6 md:px-4 sm:px-12 mb-14">
                      <h1 className="md:text-medium text-[2rem] font-bold text-gray-600">
                        MY PROFILE
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
                    <div className="min-h-[20svh]" />
                  </div>
                  <div className="w-screen pt-8 pb-14 text-textgray bg-unic">
                    <div className="grid justify-between grid-cols-1 responsive md:grid-cols-2 gap-x-10 font-h1">
                      <div className="max-w-lg">
                        <h1 className="text-left text-small md:text-medium">
                          NO VALID TOKEN DETECTED
                        </h1>
                        <br />
                        <h2 className="text-small text-left font-thin md:text-[1rem]">
                          You need to mint a valid token first.
                        </h2>
                      </div>
                      <div
                        className="pt-6 md:pt-0 object-contain text-center w-[80%]
                    md:ml-auto mr-0 ml-0 justify-self-center md:justify-self-stretch"
                      >
                        <button
                          className="float-left h-12 text-sm font-thin bg-white rounded-lg hover:bg-transparent font-p md:text-xs w-fit border-textgray hover:border-black text-textgray hover:text-black"
                          onClick={connectWallet}
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
                        MY PROFILE
                      </h1>
                    </div>
                    <div className="" />
                    <div className="flex flex-col items-center text-center">
                      {!address || !cachedProviderName ? (
                        <>
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
                          <div className="mt-0 min-h-[25vh]">
                            <div className="w-screen pt-8 pb-14 text-textgray bg-unic">
                              <div className="grid justify-between grid-cols-1 responsive md:grid-cols-2 gap-x-10 font-h1">
                                <div className="max-w-lg">
                                  <h1 className="text-left text-small md:text-medium">
                                    RESTRICTED AREA
                                  </h1>
                                  <br />
                                  <h2 className="text-small text-left font-thin md:text-[1rem]">
                                    You do not have access to this area.
                                  </h2>
                                </div>
                                <div
                                  className="pt-6 md:pt-0 object-contain text-center w-[80%]
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
                        <CardList2 list={data2} />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Footer />
          </>
        )}
      </>
    </div>
  );
}
