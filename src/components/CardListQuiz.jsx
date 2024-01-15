import React from "react";
import NFTCardQuiz from "./NFTCardQuiz";
import "../styles/CardList.css";
import { useNavigate } from "react-router-dom";

export default function CardListExplore({ list, type = "horizontal" }) {
  let navigate = useNavigate();

  return (
    <div className="container grid m-auto md:mx-auto lg:mx-auto">
      <h1 className="flex flex-col sm:pl-0 md:pl-[2%] lg:pl-[4%] xl:pl-[4%] 2xl:pl-[4%] 3xl:pl-[12%]  py-8  text-[2.1rem]  font-bold text-gray-600 pt-6 mt-0">
        Course Assessments{" "}
      </h1>
      <ul className="gap-3 pl-8 sm:flex md:grid lg:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:mx-auto lg:mx-auto">
        {list.map((item, index) => (
          <li
            key={index}
            className="col-span-1 row-span-4 py-10 pt-6 text-center text-gray-500 text-small font-p"
          >
            <NFTCardQuiz
            
              nftName={item.name}
              nftSrc={item.image}
             
              description={item.descscription}
              cnmae={item.cname}
             
              onClick={() => navigate("/detailAssessment", { state: { item: item } })}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
