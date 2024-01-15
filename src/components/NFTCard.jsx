import React from "react"
import "../styles/NFTCard.css"
import Card from "./base/Card"

const NFTCard = ({
  nftName,
  course,
  nftSrc,
  cname,
  onClick,
  semester,
  year,
  description,
}) => {
  return (
    <Card
      {...(semester !== "" && year !== "" ? (onClick = { onClick }) : "")}
      child={
        <>
          <img
            style={{ width: "80%", cursor: "pointer" }}
            className="h-auto cursor-pointer w-[90%] hover:ring-4 hover:ring-red-500 hover:ring-opacity-50 focus:outline-none focus:ring-4 focus:ring-red-700 focus:ring-opacity-50"
            src={nftSrc}
            alt=""
          />
          <div className="wrapper">
            <div className="info-container">
              <p className="text-xl font-bold md:text-2xl text-stone-600 ">
                {course}
              </p>
              <p className="mt-0 text-xl font-bold md:text-2xl text-stone-600 ">
                {cname}
              </p>
              <p className="text-small text-textgray ">
                {semester !== "" && year !== "" ? (
                  <span>
                    {" "}
                    {semester}, {year}
                  </span>
                ) : (
                  <span> </span>
                )}
              </p>
            </div>
          </div>
        </>
      }
    ></Card>
  )
}

export default NFTCard
