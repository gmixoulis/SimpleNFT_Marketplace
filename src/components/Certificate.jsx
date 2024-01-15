import React, { useState, useEffect } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import { useLocation } from "react-router";
import Header from "./Navbar";
import Footer from "./Footer";
import "../styles/NFTDetail.css";
import NotFound from "./404";
import { RingLoader } from "react-spinners";

import certificate from "../assets/certificate.png";
function Certificate() {
  const certificateWrapper = React.createRef();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
   function scrolltoId() {
    var access = document.getElementById("courses4");
    access.scrollIntoView();
  }
  const { state } = useLocation();
  return (
    <div>
      <Header />
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
          <div className="flex flex-wrap">
            <div className="flex flex-wrap content-center justify-center w-full px-12 pb-0">
              <div>
                <div className="flex flex-wrap min-h-screen Certificate lg:items-center">
                  <div
                    id="downloadWrapper"
                    ref={certificateWrapper}
                    className="relative flex flex-col justify-center w-full lg:w-1/2"
                  >
                    <img
                      id="certificateWrapper"
                      alt="Certificate"
                      src={certificate}
                      className="object-contain max-h-full"
                    />
                    <p
                      id="text"
                      className="absolute font-p text-[2vmin]  text-black top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    >
                      {state.user_address}
                    </p>
                    {state.userScore >= 60 ? (
                      <p
                        id="text"
                        className="absolute text-center font-p text-[2vmin]  text-black top-[68.2%] left-[50%] -translate-x-2/4 -translate-y-2/4"
                      >
                        Congratulations: you have passed the exam with grade{" "}
                        {state.userScore}%. Stay tuned for details on
                        how to mint your NFT certificate!
                      </p>
                    ) : (
                      <p
                        id="text"
                        className="absolute text-[#bb1d2d] text-center font-p text-[2vmin]   top-[68.2%] left-[50%] -translate-x-2/4 -translate-y-2/4"
                      >
                        We regret to inform you that you have not passed the
                        exam, as your grade is {state.userScore}%
                        (minimum 60% required).
                      </p>
                    )}
                  </div>

                  <div className="top-0 flex flex-wrap w-full pl-10 lg:w-1/2 justify-top">
                    <div className="top-0 w-full m-auto mt-0 xl:pt-0 lg:pt-12 md:pt-12 sm:pt-12">
                      <div className="pt-0 mt-0 sm:mt-6 lg:mt-0 lg:mx-6">
                        <h1
                          style={{ lineHeight: "normal", color: "#2F3031" }}
                          className="uppercase text-small text-textgray"
                        >
                          {state.cname}:
                        </h1>
                        <h1 className="w-full my-2 mb-12 text-small text-textgray">
                          NFTs and the Metaverse
                        </h1>

                        <div className="flex items-center font-thin font-p text-textgray">
                          <div
                            style={{
                              fontStyle: "normal",
                            }}
                            className="text-small font-p text-textgray "
                          >
                            Thank you for your participation to the course.{" "}
                            <br></br> <br></br>
                            <p
                       
                          className=" font-p text-small text-textgray"
                        >
                          <strong>Course Survey</strong>: Take part in our anonymous survey and share your
                          valuable thoughts and opinions with us. Participation
                          only takes a few minutes, and your anonymity is
                          guaranteed. Click{" "}
                          <a
                            className="font-semibold text-red-600 font-p"
                            href="https://www.surveymonkey.com/r/meta511"
                            target="_blank"
                          >
                            here
                          </a>{" "}
                          to access the survey.{" "}
                        </p>
                            <br></br>
                            <br></br>Thank you for your contribution!{" "}
                            <div className="mt-11">
                              <a
                                className="px-6 py-3 font-thin text-center text-white no-underline bg-[#bb1d2d] rounded hover:bg-[#a22514] hover:underline hover:text-white text-small font-p"
                                href="/"
                              >
                                Go Back
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[-8vw] Certificate">
              <div className="pb-10 pl-12 ml-6 Meta">
                {/*<button
                  className="px-6 py-3 font-thin text-center text-red-100 no-underline bg-red-500 rounded hover:bg-red-600 hover:underline hover:text-red-200 text-small font-p"
                  onClick={(e) => {
                    e.preventDefault();
                    exportComponentAsPNG(certificateWrapper, {
                      html2CanvasOptions: { backgroundColor: null },
                    });
                  }}
                >
                  Download Certificate
                </button>*/}
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Certificate;
