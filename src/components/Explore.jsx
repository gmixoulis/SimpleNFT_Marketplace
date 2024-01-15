import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import CardList from "./CardListExplore";
import CardListQuiz from "./CardListQuiz";
import { BACKEND_URL } from "../components/base/constants";
import axios from "axios";
import { useLocation } from "react-router";
import CheckChain from "../hooks/CheckChain";
import { HasToken } from "../hooks/hasToken";
import NotConnectedWallet from "../hooks/NotConnectedWallet";
import NotFound from "./404";
import ClaimContract from "../abis/marketplace.json";
import { RingLoader } from "react-spinners";
import { readContract } from "@wagmi/core";
import { useAccount } from "wagmi";

const EmptyState = () => {
  return <NotFound />;
};
export default function Explore() {
  const { state } = useLocation();
  //console.log(state);
  localStorage.removeItem("reloadCountNFT");
  const [loading, setLoading] = useState(false);

  //const [tag, setTag] = useState("All");
  //const [year, setYear] = useState("All");
  const [data2, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [exam, getExam] = useState([]);
  /*const { data } = useQuery({
    queryKey: ["nfts"],
    queryFn: getAllNFTs,
    useErrorBoundary: (error) => error.response.status >= 400,
  });
*/
  useEffect(() => {
    setLoading(true);
  }, []);
  const { address } = useAccount();

  const replacer = (key, value) =>
    typeof value === "bigint" ? value.toString() : value;
  async function GetAllNFTs() {
    await CheckChain();
    if (await HasToken()) {
      updateFetched(true);
      let data;
      await axios
        .get(BACKEND_URL + "/nfts/get_nfts/" + ClaimContract.address, {})
        .then(async (response) => {
          data = response.data.nft_values;
          const data4 = await Promise.all(
            await data.map(async (item, index) => {
              let contract = await readContract({
                address: ClaimContract.address,
                abi: ClaimContract.abi,
                functionName: "balanceOf",
                args: [address, index + 1],
              });

              let transaction = JSON.stringify(contract, replacer);
              if (transaction >= '"1"') {
                item.claimable = "Minted";
              } else {
                item.claimable = "Not Minted";
              }
              return await item;
            })
          );
          await ExamFinder();
          updateData(
            data.filter((entry) => !entry.name.includes("Final Exam"))
          );
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      async function ExamFinder() {
        let examNFT;
        for (var nft of data) {
          if (nft.name.includes("Final Exam")) {
            examNFT = nft;
            getExam(examNFT);
            return;
          }
        }
      }
    }
  }
  if (!dataFetched) GetAllNFTs();
  if (state === null) return <EmptyState />;
  // }
  /*
  //tag filters
  function _getUniqueTags() {
    const Tags = [...new Set(data.map((item) => item.semester))];
    Tags.push("All");
    return Tags.map((campus, index) => (
      <button
        type="button"
        className="text-white bg-gradient-to-br from-green-400 to-blue-600
                hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800
                font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 "
        key={index}
        onClick={() => setTag(campus)}
      >
        {campus}
      </button>
    ));
  }

  //year based filters
  function _getUniqueYears() {
    const Years = [...new Set(data.map((item) => item.year))];
    Years.push("All");
    return Years.map((year, index) => (
      <button
        type="button"
        className="ttext-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl
                focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800
                font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 text-white"
        key={index}
        onClick={() => setYear(year)}
      >
        {year}
      </button>
    ));
  }

  const tags = _getUniqueTags();
  const years = _getUniqueYears();
*/
  return (
    <div id="explore">
      <Navbar />

      <>
        <div
          style={{
            position: "relative",
            minHeight: "50vh",
            marginBottom: "8vh",
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
              <div className="flex flex-col mt-11 sm:pl-0 md:pl-[15%] lg:pl-[15%] xl:pl-[15%] 2xl:pl-[15%] 3xl:pl-[25%]  py-8 ">
                <div className="flex flex-col max-w-[1240px]  mt-0">
                  <div className="flex flex-col  float-left sm:flex max-w-[1240px]  my-auto">
                    <h1 className="text-[2.1rem]  font-bold text-gray-600 pt-6 mt-0">
                      {state.item.course} <br></br>
                      {state.item.cname} <br></br>
                    </h1>
                    <p>
                      {state.item.semester}, {state.item.year}
                    </p>
                  </div>
                </div>
              </div>
              {exam ? (
                <div className="flex pb-0 flex-col mt-11 bg-unic py-8 px-[12%] mb-0">
                  {" "}
                  {/* for exam */}
                  <div className="grid md:grid-cols-1  col-span-2 max-w-[1240px] m-auto mt-0">
                    <>
                      <CardListQuiz list={[exam]} />
                    </>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <div className="flex flex-col mt-11  py-8 px-[12%]">
                {" "}
                {/* course materials*/}
                <div className="grid md:grid-cols-1  col-span-2 max-w-[1240px] m-auto mt-0">
                  <div>
                    {data2.length === 0 && NotConnectedWallet ? (
                      <div className="text-center text-textgray">
                        <h1 className="text-textgray text-[2rem] font-h1">
                          No Tokens Found
                        </h1>
                        <br></br>
                        <br></br>
                        <h2 className="text-textgray font-thin text-[1.5rem] font-h1">
                          It looks like you do not have any NFT token in your
                          selected wallet.
                        </h2>
                      </div>
                    ) : (
                      <>{!dataFetched ? null : <CardList list={data2} />}</>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <Footer />
      </>
    </div>
  );
}
