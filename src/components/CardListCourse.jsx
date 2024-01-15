import React from "react";
import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import { useNavigate } from "react-router-dom";

export default function CardListCourse({ list, type = "horizontal" }) {
  let navigate = useNavigate();
  return (
    <div className="container flex m-auto mb-2 md:mx-auto lg:mx-auto">
      <ul className="gap-12 sm:flex md:grid lg:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:mx-auto lg:mx-auto">
        {list.map((item, index) => (
          <li
            key={index}
            className="col-span-1 row-span-4 py-10 pt-6 pb-2 text-center text-gray-500 text-small font-p"
          >
            <NFTCard
              nftName={item.cname}
              nftSrc={item.image}
              year={item.year}
              claimable={item.claimable}
              description={item.description}
              cname={item.cname}
              semester={item.semester}
              key={index}
              course={item.course}
              onClick={() => navigate("/courseview", { state: { item: item } })}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
