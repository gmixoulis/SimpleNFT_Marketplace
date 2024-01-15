import React from "react";
import "../styles/NFTCard.css";
import Card from "./base/Card";

const NFTCardQuiz = ({
  nftName,
  course,

  nftSrc,
  onClick,

}) => {
  return (
    <Card
      onClick={onClick}
      child={
        <>
          <img className="h-auto cursor-pointer w-[90%] hover:ring-4 hover:ring-red-500 hover:ring-opacity-50 focus:outline-none focus:ring-4 focus:ring-red-700 focus:ring-opacity-50" src={nftSrc} alt="" />

          <div className="wrapper">
            <div className="info-container w-[75%]">
              <p
                style={{ fontSize: "0.9rem" }}
                className="text-textgray font-p"
              >
                {" "}
                {course}
              </p>
              <p
                style={{ fontSize: "0.91rem" }}
                className="text-textgray font-p"
              >
                {nftName}
              </p>
              {/*<p
                style={{ fontSize: "0.8rem" }}
                className="text-textgray font-p"
              >
                {semester}, {year}
      </p>*/}
            </div>

            <div style={{ marginRight: "4rem" }} className="price-container">
              <p className="price-label"></p>
             
                <button
                  style={{ fontSize: "1rem" }}
                  className="button hover:text-white  hover:bg-[#f54b4b98]  hover:border-white text-white w-[150%] bg-[#f54b4b98] border-white font-p w-37 max-w-20 h-auto text-center m-auto  mt-0"
                >
                </button>
            
            </div>
          </div>
        </>
      }
    ></Card>
  );
};

export default NFTCardQuiz;
