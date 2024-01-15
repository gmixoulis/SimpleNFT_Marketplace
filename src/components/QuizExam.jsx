import React, { useState, useEffect } from "react";
import Header from "./Navbar";
import Footer from "./Footer";
import CheckChain from "../hooks/CheckChain";
import { HasToken } from "../hooks/hasToken";
import isConnected from "../hooks/isConnected";
import NotConnectedWallet from "../hooks/NotConnectedWallet";
import "survey-core/defaultV2.css";
import axios from "axios";
import { BACKEND_URL } from "./base/constants";
import SurveyPage from "./base/SurveyPage";
import { RingLoader } from "react-spinners";
import Accordion from "@heycar-uikit/accordion";
import { Modal, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function SurveyComponent() {
  const [dataFetched, updateFetched] = useState(false);
  const [loadingRing, setLoadingRing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alerted, setAlert] = useState([]);
  const [openModal, setOpenModal] = useState("undefined");
  let navigate = useNavigate();

  useEffect(() => {
    setLoadingRing(true);
    setTimeout(() => {
      setLoadingRing(false);
    }, 2000);
  }, []);
  
    function scrolltoId() {
    var access = document.getElementById("courses4");
    access.scrollIntoView();
  }
  
  async function CheckToken() {
    await CheckChain();
    if (await HasToken()) {
      updateFetched(true);
    }
  }
  if (!dataFetched) CheckToken();

  const ethers = require("ethers");

  const [publicKey, setPublicKey] = useState("");
  const [survey, setSurvey] = useState("");
  // 1
  var signer;
  const getPublicAddress = async () => {
    if (!window.ethereum) {
      const err = "Please install MetaMask first!";
      window.alert(err);
      throw new Error(err);
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const publicAddress = await signer.getAddress();
    setPublicKey(publicAddress);
    setLoading(true);
  };
  getPublicAddress();

  const decrypt = async (account) => {
    const jwt = sessionStorage.getItem("survey:auth");
    const keyB64 = await window.ethereum.request({
      method: "eth_getEncryptionPublicKey",
      params: [account],
    });
    const publicKey = Buffer.from(keyB64, 'base64').toString("hex");
     console.log("string to hex ", publicKey);
    var response1;
    await axios
      .get(
        BACKEND_URL + "/survey/schema?" + "jwt=" + jwt + "&" + "pbkey=" + publicKey
      )
      .then((response) => {
        console.log("DSD ", response);
        response1 = response;
      })
      .catch((error) => {
        if (error.response.status == 500) {
          setAlert(error.response.data.msg);
          setOpenModal("default");
          return;
        }
      });

    const text = await response1.data.data;
    const result = await window.ethereum.send("eth_decrypt", [text, account]);

    setSurvey(result.result);
  };

  //const account = metaState.account[0];
  return (
    <>
      <Header />
      <div >
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
          <>
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

                <div id="course4" className="w-auto h-auto py-20 ">
                  <div className="responsive">
                    <div className="font-h md:text-medium text-[2rem] text-textgray pb-6 leading-none">
                      META511: NFTs AND THE METAVERSE
                    </div>

                    <div className="grid m-auto">
                      <p className="pb-4 text-justify text-p font-p">
                        {" "}
                        To begin the exam quiz for the "NFTs and Metaverse"
                        MOOC, you will first need to verify your identity by
                        connecting your self-custodial wallet.
                      </p>
                      <Accordion
                        className="my-5 text-left"
                        title="Final Examination Instructions"
                        open={true}
                      >
                        <ol className="text-[gray] font-normal font-p text-p space-y-[-1%]">
                          <li>
                            1. The final exam quiz will be available between
                            Friday, 17 March 2023 19:00:00 UTC and Tuesday, 21
                            March 2023 19:00:00 UTC. Please use a time converter
                            to convert to your own time zone (for example,
                           <a href="https://dateful.com/time-zone-converter" target="_blank"> https://dateful.com/time-zone-converter </a>).
                          </li>
                          <li>
                            2. You will have a two (2) hour time limit to
                            complete the quiz from the moment you start it. You
                            will only be able to attempt the quiz once per
                            wallet address.
                          </li>
                          <li>
                            3. To access the final exam quiz, please use a
                            desktop or laptop device with MetaMask (recommended)
                            installed on your web browser. Mobile devices are
                            not supported in the current version.
                          </li>
                          <li>
                            4. Double-check that your MetaMask wallet is
                            connected to the exam site and owns the course
                            access token. IMPORTANT: You won’t be able to access
                            the exam without the token.
                          </li>
                          <li>
                            5. It is recommended that you use the same Ethereum
                            account throughout the entire quiz. Avoid switching
                            wallet addresses while attempting the quiz.
                          </li>
                          <li>
                            6. The exam will consist of 50 multiple-choice
                            questions. Each question has 4 possible answers.
                          </li>
                          <li>
                            7. The quiz questions will be presented in 5 pages
                            (10 questions per page). Once you finish with your
                            responses for each page, you can proceed to the next
                            page. 
                          </li>
                          <li>
                            8. There are two types of questions: radio buttons
                            (where only one answer can be selected as correct)
                            and checkboxes (where more than one answers may be
                            correct). In check boxes, at least one answer is
                            always correct.
                          </li>
                          <li>
                            9. For questions that allow multiple responses, a
                            penalty is applied for incorrect answers.
                          </li>
                          <li>
                            10. The exam is open book: you can consult course
                            materials, research the internet and any other
                            external sources you think appropriate.
                          </li>
                          <li>
                            11. At the end of the quiz, you will need to submit
                            your responses (by pressing "Complete") and sign
                            them (with your wallet) before sending them for
                            validation. This is a critical step to ensure that
                            your responses are properly recorded and graded.
                          </li>
                          <li>
                            12. When you successfully submit, you will learn the
                            result (pass or fail, and grade) immediately. Do not
                            close the browser before you see this message!
                          </li>
                          <li>
                            13. To pass the quiz, you must score at least 60%
                            (30 out of 50 questions).
                          </li>
                          <li>
                            14. You need to complete the examination within 2
                            hours. There will be a countdown clock at the top of
                            the exam page to help you with time management. If
                            your responses are incomplete when time expires, you
                            will have the option to sign them off with your
                            wallet before submitting to the server to receive a
                            grade.
                          </li>
                        </ol>
                        <div className="pt-4 text-justify text-p font-p">
                        <p className="font-bold text-justify text-p font-p text-textgray">
                          Good luck!
                        </p>{" "}
                        <br></br>
                        <p className="text-justify text-p font-p text-textgray ">
                          <strong>Support</strong>: If you encounter any issues,
                          reach out to our support team on Discord in the
                          #chat-nftmetaverse-mooc channel. Support will be live
                          between 21:00 and midnight on Friday and between 09:30
                          and 16:30 on other days (all times, Cyprus time
                          GMT+2).
                        </p>
                        <br></br>

                        <p
                       
                          className=" font-p text-p text-textgray"
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
                      </div>
                      </Accordion>
                      
                    </div>
                  </div>
                </div>
                <div className="grid place-items-center bg-unic">
                  {!survey ? (
                    <div>
                      <button
                        id="buttonQuiz1"
                        className="font-thin text-center my-5 bg-[#707070] text-small font-p
                        min-w-[290px] min-h-[50px]"
                        onClick={() => decrypt(publicKey)}
                      >
                        Access the Exam
                      </button>
                    </div>
                  ) : (
                    <SurveyPage survey={survey} />
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default SurveyComponent;
