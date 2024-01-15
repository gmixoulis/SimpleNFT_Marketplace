import React from "react";
import NFTCard from "./NFTCard2";
import "../styles/CardList.css";
import { useNavigate } from "react-router-dom";

export default function CardListProfile({ list, type = "horizontal" }) {
  let navigate = useNavigate();

  return (
    <div className="container flex m-auto md:mx-auto lg:mx-auto">
      <ul className="gap-10 sm:flex md:grid lg:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:mx-auto lg:mx-auto">
        {list.map((item, index) => (
          <li
            key={index}
            className="col-span-1 row-span-4 text-center text-gray-500 text-small font-p"
          >
            <NFTCard
              nftName={item.name}
              nftSrc={item.image}
              year={item.year}
              claimable={item.claimable}
              semester={item.semester}
              key={index}
              cname={item.cname}
              course={item.course}
              description={item.description}
              onClick={() => navigate("/detail", { state: { item: item } })}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
