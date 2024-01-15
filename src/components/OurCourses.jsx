import CardList from "./CardListCourse";
import React, { useState } from "react";
//import "../styles/base/AccordionHeader.css";
import CourseContract from "../abis/course_mainet.json";
import { BACKEND_URL } from "../components/base/constants";
import axios from "axios";
import { ourCourse } from "../abis/ourCourse.js";
const OurCourses = () => {
  const [data1, updateData] = useState("");
  const [dataFetched, updateFetched] = useState(false);

  /*const { data } = useQuery(
    "tokens",
    isConnected ? () => GetTokens() : undefined
  );*/
  async function GetAllNFTs() {
    //const provider1 = await detectEthereumProvider();

    // if(window.ethereum) CheckChain();
    updateFetched(true);
    updateData([ourCourse]);
    let data;
    await axios
      .get(BACKEND_URL + "/nfts/get_nfts/" + CourseContract.address, {})
      .then(async (response) => {
        data = response.data.nft_values;
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    updateData(data);
  }

  if (!dataFetched) GetAllNFTs();

  return (
    <div
      id="ourcourses"
      style={{ paddingBottom: "5rem" }}
      className="w-auto h-auto mb-0 bg-unic md:mb-14 py-14"
    >
      <div className="responsive">
        <div className="grid m-auto">
          <div className="pb-4 md:px-4 sm:px-12">
            <h1 className="md:text-medium text-[2rem] font-bold text-textgray">
              OUR COURSES
            </h1>
          </div>
          <div>
            {!dataFetched ? (
              <h1 className="text-center text-small text-text-textgray font-h1">
                Connect Your Wallet!{" "}
              </h1>
            ) : (
              <CardList list={data1} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCourses;
