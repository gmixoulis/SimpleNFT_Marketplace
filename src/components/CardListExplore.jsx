import React from "react";
import NFTCard2 from "./NFTCard2";
import "../styles/CardList.css";
import { useNavigate } from "react-router-dom";

export default function CardListExplore({ list, type = "horizontal" }) {
  let navigate = useNavigate();

  return (
    <div className="container grid m-auto md:mx-auto lg:mx-auto">
      <h1 className="flex flex-col sm:pl-0 md:pl-[2%] lg:pl-[4%] xl:pl-[4%] 2xl:pl-[4%] 3xl:pl-[12%]  py-8  text-[2.1rem]  font-bold text-gray-600 pt-6 mt-0">
        Course Materials{" "}
      </h1>
      <ul className="pl-8 gap-7 sm:flex md:grid lg:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:mx-auto lg:mx-auto">
        {list.map((item, index) => (
          <li
            key={index}
            className="col-span-1 row-span-4 py-10 pt-6 pb-10 text-center text-gray-500 text-small font-p"
          >
            <NFTCard2
              nftName={item.name}
              nftSrc={item.image}
              year={item.year}
              claimable={item.claimable}
              description={item.descscription}
              cnmae={item.cname}
              tag={item.semester}
              key={index}
              cname={item.cname}
              course={item.course}
              semester={item.semester}
              onClick={() => navigate("/detail", { state: { item: item } })}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
