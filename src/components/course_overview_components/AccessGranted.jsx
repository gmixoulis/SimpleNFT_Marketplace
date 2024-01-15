import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AccessGranted = ({ state }) => {
  const navigate = useNavigate();

  return (
    <div className="md:grid lg:flex lg:flex-wrap w-[50vw]">
      <div className="object-contain lg:w-2/3">
        <h1
          id="aceestext1"
          className="md:mt-8 mb-1 text-medium md:text-[1.4vw] font-h1 text-textgray"
        >
          ACCESS GRANTED
        </h1>
        <h2 id="aceestext2" className="mb-2 font-thin text-small md:text-small font-p text-textgray lg:mb-14">
          You can now access course materials.
        </h2>
      </div>
      <div className="w-2/3 lg:w-1/3 lg:mt-8">
        <button className=" h-[5vh] w-full text-[2.5vw]  lg:w-[13vw] lg:text-[1vw]  content-center  text-gray-200 border-0 bg-gray-600 px-4  font-medium  tracking-wide rounded-xl hover:bg-gray-800 hover:text-white duration-200 ">
          {" "}
          <Link
          className="hover:text-white"
            to="/explore"
            onClick={(e) => {
              e.preventDefault();
              navigate("/explore", {
                state: { item: state.item },
              });
            }}
          >
            COURSE MATERIALS
          </Link>
        </button>
        {/* <button className=" mt-[1vh] h-[5vh]  w-[13vw] text-[1vw]  content-center  text-gray-200 border-0 bg-gray-600 px-4 py-2 font-medium  tracking-wide rounded-xl hover:bg-gray-800 hover:text-white duration-200">
          {" "}
          <Link
           className="hover:text-white"
            to="/explore"
            onClick={(e) => {
              e.preventDefault();
              navigate("/explore", {
                state: { item: state.item },
              });
            }}
          >
            JOIN CLASSROOM
          </Link>
        </button> */}
      </div>
    </div>
  );
};

export default AccessGranted;
