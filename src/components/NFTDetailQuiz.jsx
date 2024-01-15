import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Header from "./Navbar";
import Footer from "./Footer";
import "../styles/NFTDetail.css";
import NotFound from "./404";
import Image from "./base/Image";
import urlify from "../hooks/urlify";
import { Label, Checkbox, Button, Modal } from "flowbite-react";
import CheckChain from "../hooks/CheckChain";
import { HasToken } from "../hooks/hasToken";
import isConnected from "../hooks/isConnected";
import NotConnectedWallet from "../hooks/NotConnectedWallet";
import { Login } from "./base";
import * as constants from "./base/constants";
import { RingLoader } from "react-spinners";
const EmptyState = () => {
  return <NotFound />;
};
const NFTDetail = () => {
  const { state } = useLocation();
  const [buton, setButton] = useState(true);
  const [loadingRing, setLoadingRing] = useState(false);
  const [alerted, setAlert] = useState([]);
  const [openModal, setOpenModal] = useState("undefined");
  let navigate = useNavigate();
  const [dataFetched, updateFetched] = useState(false);
  const [surveyJWT, setSurveyJWT] = useState("");
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    setLoadingRing(true);
    setTimeout(() => {
      setLoadingRing(false);
    }, 2000);
  }, []);
  if (state === null) return <EmptyState />;

  function changeButton() {
    setButton(!buton);
  }
  async function CheckToken() {
    await CheckChain();
    if (await HasToken()) {
      updateFetched(true);
      setSurveyJWT(sessionStorage.getItem(constants.SURVEY_TOKEN_KEY));
    }
  }
  if (!dataFetched) CheckToken();

  const onLoggedIn = (token, pubAddr) => {
    if (token.includes("matching")) {
      setAlert(
        "Something occured due to overloaded server. Please refresh the page and try again "
      );
      setOpenModal("default");
      return;
    } else {
      sessionStorage.setItem(constants.SURVEY_TOKEN_KEY, token);
      setSurveyJWT(token);
      navigate("/quizExam");
      return;
    }
  };

  return (
    <div>
      <Header />
      {loadingRing ? (
        <div className="flex items-center justify-center h-screen containerClip">
          <br></br>
          <RingLoader
            color={"#d63636"}
            loading={loadingRing}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />{" "}
        </div>
      ) : (
        <div
          style={{
            minHeight: "78vh",
          }}
        >
          {!dataFetched && NotConnectedWallet && isConnected ? (
            <>
              <div className="object-center h-screen bg-unic">
                <div className="responsive ">
                  <div className="flex object-center pt-[30%] ">
                    <div className="object-center text-gray-700 font-h1 ">
                      <h1 className="mt-8 object-center m-auto mb-1 text-large md:text-[2rem] font-h1 text-textgray">
                        THIS COURSE IS TOKEN GATED
                      </h1>
                      <h2 className="text-small md:text-small font-h1 text-textgray mb-14">
                        Connect your wallet to view course materials
                      </h2>
                    </div>
                    <div className="pb-6 m-auto font-p lg:py-6">
                      <React.Fragment>
                        <button
                          style={{
                            zIndex: "100",
                            float: "left",
                            height: "3.125rem",
                            maxHeight: "100%",
                          }}
                          className="px-5 ml-auto mr-2 text-sm font-thin text-center bg-transparent rounded-lg w-fit text-textgray text-small font-p border-textgray hover:border-black hover:text-black"
                        >
                          {" "}
                          CONNECTED
                        </button>
                      </React.Fragment>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Modal
                id="modal1"
                show={openModal === "default"}
                onClose={() => setOpenModal("undefined")}
              >
                <Modal.Header>{alerted}</Modal.Header>
                <Modal.Footer>
                  <Button
                    color="failure"
                    onClick={() => window.location.reload(false)}
                  >
                    Refresh
                  </Button>
                  <Button color="gray" onClick={() => navigate(-1)}>
                    Go back
                  </Button>
                </Modal.Footer>
              </Modal>
              <div className="flex flex-col w-full h-auto">
                <div className="responsive">
                  <div
                    style={{ with: "100%", height: "auto" }}
                    className="grid w-full grid-rows-2 px-2 pt-16 lg:grid-cols-1 xl:grid-cols-2 justify-evenly md:items-start "
                  >
                    <div className="grid ">
                      <div className="lg:mb-12 lg:pb-12 ">
                        <Image
                          className=" lg:mx-6 lg:w-1/2 lg:h-96"
                          src={state.item.image}
                        />
                      </div>
                      <div>
                        {" "}
                        <div id="details"></div>
                      </div>
                    </div>

                    <div className="top-0 w-full m-auto mt-0 xl:pt-0 lg:pt-12 md:pt-12 sm:pt-12">
                      <div className="pt-0 mt-0 sm:mt-6 lg:mt-0 lg:mx-6">
                        <h1
                          style={{ lineHeight: "normal", color: "#2F3031" }}
                          className="uppercase text-small text-textgray"
                        >
                          {state.item.course}:
                        </h1>
                        <h1 className="w-full my-2 uppercase text-small text-textgray">
                          {state.item.cname}
                        </h1>

                        <h1
                          style={{ lineHeight: "normal" }}
                          className="text-[2rem] mb-2 w-full font-h1 text-textgray "
                        >
                          {state.item.name}
                        </h1>

                        <div className="flex items-center font-thin font-p text-textgray">
                          <div
                            style={{
                              fontStyle: "normal",
                            }}
                            className="text-small font-p text-textgray "
                          >
                            Contract: 0x4E2d9546CCFEc5B126706e02aFD329ef53B3Ae01{" "}
                            <br></br>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: urlify(state.item.description),
                              }}
                            ></div>{" "}
                            <br></br>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox onClick={() => changeButton()} id="agree" />
                          <Label htmlFor="agree">
                            I agree with the <></>
                            <a
                              href="/terms"
                              className="text-red-600 hover:underline dark:text-red-500"
                            >
                              terms and conditions
                            </a>
                          </Label>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-5">
                          <div>
                            <Login
                              onLoggedIn={onLoggedIn}
                              buton={buton}
                              onClick={(e) => e.preventDefault()}
                            ></Login>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default NFTDetail;
