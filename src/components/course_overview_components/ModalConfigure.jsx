import React, { useState, useEffect } from "react";

import Certificate from "../../assets/certificate1.png";
import {
  Button,
  Radio,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Flowbite,
  Alert,
} from "flowbite-react";
import { Transition, Disclosure } from "@headlessui/react";
import classnames from "classnames";
import { FaChevronRight } from "react-icons/fa";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import axios from "axios";
import { BACKEND_URL } from "../../components/base/constants";
import { ethers } from "ethers";
const CertificateView = ({ hasToken, tokenId, address }) => {
  const [openModal, setOpenModal] = useState(false);
  const [topping, setTopping] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataFetched, updateFetched] = useState(false);
  const [email, setEmail] = useState("");
  const [defaultWallet, setDefaultWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const props = { openModal, setOpenModal, email, setEmail };
  // Add useState for each checkbox
  const [isCheckbox1Checked, setIsCheckbox1Checked] = useState(false);
  const [isCheckbox2Checked, setIsCheckbox2Checked] = useState(false);
  const [isCheckbox3Checked, setIsCheckbox3Checked] = useState(false);

  const [name, setName] = useState("unknown");
  const [examTaker, setExamTaker] = useState("unknown");
  const [mint_pass_holder, setMintPassHolder] = useState(address);
  const [kyc_verification, setKycVerification] = useState("unknown");
  const [ens_verification, setEnsVerification] = useState("unknown");
  const [mint_pass_balanceOf, setMintPassBalanceOf] = useState("unknown");

  useEffect(() => {
    // initiate web3modal
    getCertificate();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  // Disable the "Submit" button when not all checkboxes are checked
  const isSubmitDisabled = !(
    isCheckbox1Checked &&
    isCheckbox2Checked &&
    isCheckbox3Checked
  );

  // Prevent editing from the console
  Object.freeze({
    openModal,
    setOpenModal,
    topping,
    setTopping,
    isCheckbox1Checked,
    setIsCheckbox1Checked,
    isCheckbox2Checked,
    setIsCheckbox2Checked,
    isCheckbox3Checked,
    setIsCheckbox3Checked,
  });

  async function getCertificate() {
    updateFetched(true);
    await axios
      .get(BACKEND_URL + "/certificates/get_certificate/" + address)
      .then(async (response) => {
        try {
          const data1 = response.data;
          setExamTaker(data1["exam_taker"]);
          setKycVerification(data1["kyc_verification"]);
          setEnsVerification(data1["ens_verification"]);
          setName(data1["name"]);
          setMintPassBalanceOf(data1["mint_pass_balanceOf"]);
        } catch (err) {
          console.log(err);
        }
      })

      .catch((error) => {
        console.log(error);
      });
    if (examTaker === "unknown") {
      try {
        await axios
          .get(BACKEND_URL + "/certificates/check-address/" + address)
          .then((response) => {
            if (response.data.message === "true") {
              setExamTaker(address);
            } else  setExamTaker('unknown');
          })
          .catch((error) => {});
      } catch (err) {
        console.log(err);
      }
    }
  }
  const handleAddCertProfile = async () => {
    setError("");
    setSuccess("");
    const value1 = document.getElementById("other")?.value || "";

    try {
      if (value1 && document.getElementById("other")?.value !== "") {
        if (isValidEthereumAddress(document.getElementById("other").value)) {
          setDefaultWallet(document.getElementById("other").value);
        } else {
          setError("Please input a valid Ethereum address.");
          return;
        }
      }
      if (defaultWallet === "unknown") {
        setError(
          " Wallet information for exam taker is missing. Select either 'Mint Pass' or 'Other'."
        );
        return;
      }

      const certProfileData = {
        exam_taker: examTaker,
        mint_pass_holder: address,
        name: name,
        mint_pass_balanceOf: mint_pass_balanceOf,
        kyc_verification:
          kyc_verification == "unknown" ? "Unverified" : kyc_verification,
        ens_verification:
          ens_verification == "unknown" ? "Unverified" : ens_verification,
        wallet_allowed_to_mint_cert: defaultWallet,
        user_confirmed: true,
        user_confirmed_time: Date.now(),
        token_id: tokenId,
        // Add other fields of the cert_profile as needed
      };

      // Make the POST request to your server
      try {
        const response = await axios.post(
          BACKEND_URL + "/certificates/add-cert-profile",
          certProfileData
        );

        // Handle the response as needed (e.g., show success message)
        console.log(response.data);
        setSuccess(
          "Congratulations! Certificate details have been successfully recorded for your token ID."
        );
      } catch (err) {
        console.log(err);
        if (err.response?.data.error === "User's profile already exists.") {
          setError("A profile for this user already exists.");
        } else if(err.response?.data.error === "User with this token already exists."){
          setError("User with this token already exists.")
        } 
        else {
          setError("Action Not Permitted..");
        }
      }
    } catch (error) {
      console.log(error);
      // Handle error (e.g., show error message)
      setError("Action Not Permitted..");
    }
  };
  const isValidEthereumAddress = (address) => {
    console.log(ethers.utils.isAddress(address));
    return ethers.utils.isAddress(address);
  };

  if (!dataFetched) getCertificate();
  return (
    <div className="text-textgray bg-unic py-28">
      <Flowbite>
        <Modal
          show={props.openModal === "form-elements"}
          size="3xl"
          popup
          className="pt-4 z-[999999]"
          onClose={() => props.setOpenModal(undefined)}
        >
          <Modal.Header id="modalConf">
            {" "}
            Verify Your Details for Certification
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-7 ">
              <div>
                <h2 className="ml-5 "> Info on your Certificate</h2>

                <div className="flex flex-wrap content-center self-center pt-0 mt-0 ml-5 align-center">
                  <TextInput
                    disabled
                    value="Full Name / ENS"
                    className="w-[9.5em] text-[14px] text-center"
                  />
                  <TextInput
                    className="ml-10 !w-[26em] text-[12px] "
                    disabled
                    value={name}
                  />{" "}
                </div>
              </div>
              <div>
                <div className="flex flex-wrap content-center self-center ml-5 align-center mt-[-3vh]">
                  <TextInput
                    disabled
                    value="Exam taker"
                    className="w-[9.5em] text-[14px] text-center"
                  />
                  <TextInput
                    className="ml-10 !w-[26em] text-[12px] "
                    disabled
                    value={examTaker}
                  />{" "}
                </div>
              </div>
              <div>
                <div className="flex flex-wrap content-center self-center ml-5 align-center mt-[-3vh]">
                  <TextInput
                    disabled
                    value="Mint pass holder"
                    className="w-[9.5em] text-[14px] text-center"
                  />
                  <TextInput
                    className="ml-10 !w-[26em] text-[12px]"
                    disabled
                    value={mint_pass_holder}
                  />{" "}
                </div>
              </div>

              <div>
                <div className="inline-flex flex-wrap items-center content-center self-center pt-0 mt-[-5vh] ml-5">
                  <h3 className="w-[9.5em] text-[14px] text-left self-left ">
                    KYC Verification{" "}
                  </h3>
                  {loading ? (
                    <div className="animate-pulse" />
                  ) : kyc_verification === "Completed" ? (
                    <FaCheckCircle
                      className="w-5 h-5"
                      style={{ color: "#28c91d" }}
                    />
                  ) : kyc_verification === "Pending" ? (
                    <FaQuestionCircle
                      className="w-5 h-5"
                      style={{ color: "orange" }}
                    />
                  ) : (
                    <FaTimesCircle
                      className="w-5 h-5"
                      style={{ color: "red" }}
                    />
                  )}
                </div>

                <div className="inline-flex flex-wrap items-center content-center self-center !pt-0 !mt-0 mb-5 ml-5">
                  <h3 className="w-[9.5em] text-[14px] text-left self-center">
                    ENS Verification
                  </h3>
                  {loading ? (
                    <div className="animate-pulse" />
                  ) : ens_verification === "Completed" ? (
                    <FaCheckCircle
                      className="w-5 h-5"
                      style={{ color: "#28c91d" }}
                    />
                  ) : ens_verification === "Pending" ? (
                    <FaQuestionCircle
                      className="w-5 h-5"
                      style={{ color: "orange" }}
                    />
                  ) : (
                    <FaTimesCircle
                      className="w-5 h-5"
                      style={{ color: "red" }}
                    />
                  )}
                </div>
              </div>
              <div className="!mt-0 pr-2 md:w-[33em]">
                <h3 className="w-full pb-2 pl-5 text-left align-left">
                  Choose the wallet where you will mint the certificate from:
                </h3>
                <div className="grid grid-cols-1 pt-2 mb-0 ml-5 self-left content-left align-left bg-unic border-textgray rounded-xl">
                  <div className="flex gap-2 pl-2 pr-2 self-left items-left">
                    <Radio
                      id="Exam-taker-wallet"
                      name="address_radio_buttons"
                      value="Exam taker wallet"
                      onClick={() => {
                        setTopping(false);
                        setDefaultWallet(examTaker);
                      }}
                    />
                    <Label htmlFor="remember">Exam taker wallet</Label>
                    <Radio
                      id="Mint-pass-holder"
                      name="address_radio_buttons"
                      value="Mint pass holder"
                      onClick={() => {
                        setTopping(false);
                        setDefaultWallet(mint_pass_holder);
                      }}
                    />
                    <Label htmlFor="remember">Mint pass holder</Label>

                    <Radio
                      name="address_radio_buttons"
                      value="Other"
                      onClick={() => setTopping(true)}
                    />
                    <Label htmlFor="remember">Other</Label>
                  </div>
                  <div className="flex  flex-wrap items-left self-left justify-left pt-2 mb-1 !mt-0 ml-3">
                    {topping ? (
                      <TextInput
                        id="other"
                        className="w-3/4 text-[12px] font-light"
                        placeholder="Enter a valid Ethereum address"
                      />
                    ) : (
                      <TextInput
                        disabled
                        value={defaultWallet}
                        className="w-3/4 text-[12px] font-light"
                        placeholder="Enter a valid Ethereum address"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid content-center self-center ml-5 align-center mt-[3vh]">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="validity"
                  checked={isCheckbox1Checked}
                  onChange={(e) => setIsCheckbox1Checked(e.target.checked)}
                />
                <Label htmlFor="validity">
                  I verify the validity and accuracy of the data provided
                </Label>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  id="responsible"
                  checked={isCheckbox2Checked}
                  onChange={(e) => setIsCheckbox2Checked(e.target.checked)}
                />
                <Label htmlFor="responsible">
                  I agree to be held solely responsible for the accuracy of the
                  data provided
                </Label>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  id="own-behalf"
                  checked={isCheckbox3Checked}
                  onChange={(e) => setIsCheckbox3Checked(e.target.checked)}
                />
                <Label htmlFor="own-behalf">
                  I verify that I am acting on my own behalf
                </Label>
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              {/* Disable the "Submit" button when not all checkboxes are checked */}
              <Button
                color="success"
                className="hover:text-white"
                disabled={isSubmitDisabled}
                onClick={handleAddCertProfile}
              >
                Submit
              </Button>
              <Button
                onClick={() => props.setOpenModal(false)}
                color="failure"
                className="hover:text-white"
              >
                Discard
              </Button>
              <Button
                color="warning"
                className="hover:text-white"
                onClick={() =>
                  (window.location = "mailto:nftcertificates@unic.ac.cy")
                }
              >
                Dispute
              </Button>
            </div>
            <div
              className={
                error === ""
                  ? "hidden"
                  : "block w-full h-[70%] text-[12px] z-99 pt-3"
              }
            >
              <Alert
                color="failure"
                icon={FaExclamationCircle}
                onDismiss={() => setError("")}
              >
                <span>
                  <p className="!text-[14px]">{error}</p>
                </span>
              </Alert>
            </div>
            <div
              className={
                success === ""
                  ? "hidden"
                  : "block w-full h-[70%] text-[12px] z-99 pt-3"
              }
            >
              <Alert
                color="success"
                size="small"
                icon={FaExclamationCircle}
                onDismiss={() => setSuccess("")}
              >
                <span>
                  <p className="!text-[14px]">{success}</p>
                </span>
              </Alert>
            </div>
          </Modal.Body>
        </Modal>
      </Flowbite>
      <h1 className="responsive tracking-wide mb-6 font-bold text-textgray lg:text-medium text-[2rem] pb-0 lg:pb-2">
        CERTIFICATE DETAILS
      </h1>
      <div className="grid grid-cols-1 responsive lg:grid-cols-2 lg:gap-20">
        {/* COLUMN 1 */}
        <div>
          <img src={Certificate} alt="Certificate" className="w-[35rem]" />
        </div>
        {/* COLUMN 2 */}
        <div className="flex flex-col lg:items-start">
          <div className="flex flex-col ">
            <div>
              <p className="text-gray-800 text-[1.1rem]">
                Redeem: <span className="font-light"> Claim</span>
              </p>
              <p className="text-gray-800 text-[1.1rem]">
                Mint Pass:<span className="font-light"> Required</span>
              </p>
              <p className="text-gray-800 text-[1.1rem]">
                Price:<span className="font-light"> 0 Ξ + gas fees</span>
              </p>
              <p className="text-gray-800 text-[1.1rem]">
                Eligibility:
                <span className="font-light text-[1.1rem]"> Pass-grade</span>
              </p>
              <p className="text-gray-800 text-[1.1rem]">
                Token Standard:
                <span className="font-light"> ERC-721</span>
              </p>
              <p className="text-gray-800 text-[1.1rem]">
                Blockchain:<span className="font-light"> Ethereum </span>
              </p>
            </div>
          </div>
          <div className="flex items-start pt-4 lg:grid lg:grid-cols-2 lg:gap-4">
            <div>
              <div className="w-[8.5rem] h-[2.5rem] grid grid-cols-7 justify-between">
                <button
                  disabled={false} //!hasToken
                  onClick={() => props.setOpenModal("form-elements")}
                  className="text-gray-200 mx-10 lg:flex lg:items-center lg:mx-auto justify-center h-[2.5rem] w-[8.5rem] border-0 bg-gray-600 px-4 py-2 font-medium text-base tracking-wide rounded-xl hover:bg-gray-800 hover:text-white duration-200"
                >
                  {hasToken ? "VERIFY" : "NO TOKEN"}
                </button>
              </div>
            </div>
          </div>
          <br></br>
          <Disclosure as="div" key={1} className="pb-6 md:max-w-[24vw] w-full">
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={classnames(
                    "flex items-center  rounded-none w-full md:w-[24vw] bg-gray-50 border-1 border-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 hover:duration-200 focus:outline-0 focus:ring-0",
                    { "border-b-0": open }
                  )}
                >
                  <FaChevronRight
                    className={`${
                      open ? "rotate-90 transform duration-300" : ""
                    } text-textgray`}
                  />

                  <span className="px-4 font-light text-textgray">
                    About the Certificate
                  </span>
                </Disclosure.Button>
                <Transition
                  enter="transition duration-300 ease-out"
                  enterFrom="transform scale-100 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="px-2 py-2 font-light border border-t-0 border-gray-300 bg-gray-50 text-textgray">
                  The META511 NFT is a generative art certificate crafted by @Ars0nic and @6529er. The script for generating the unique image of the certificate is stored entirely on-chain 🔍 Your personalized certificate includes EITHER your name (subject to KYC verification) OR your ENS (subject to ownership verification) or your public Ethereum wallet address. It also includes your final grade, which is the "seed” for generating the artistic part of the certificate: the higher the grade, the more visual elements in the certificate! 
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </div>
  );
};

export default CertificateView;
