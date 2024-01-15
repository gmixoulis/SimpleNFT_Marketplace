import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaRegTimesCircle, FaCheck, FaTimes, FaClock } from "react-icons/fa";
import ReactFlow, { Controls } from "react-flow-renderer";

const CertificateView = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [isCheckbox1Checked, setIsCheckbox1Checked] = useState(false);
  const [isCheckbox2Checked, setIsCheckbox2Checked] = useState(false);
  const [isCheckbox3Checked, setIsCheckbox3Checked] = useState(false);
  const flowElements = [
    {
      id: "1",
      type: "input",
      data: { label: "Wallet allowed to mint" },
      position: { x: 170, y: 453 },
    },
  ];
  const handleCancel = () => {
    setOpenModal(false);
    // Reset the form here if necessary
  };

  const handleSubmit = () => {
    // Perform the form submission and validation here
    // Check if checkboxes are checked and if the form is valid
    // If successful, close the modal
    if (isCheckbox1Checked && isCheckbox2Checked && isCheckbox3Checked) {
      setOpenModal(false);
      // Perform additional actions or API calls here
    }
  };

  return (
    <div className="text-textgray bg-unic py-28">
      <Transition appear show={openModal} as={Fragment}>
        {/* Existing dialog code */}
      </Transition>
      <h1 className="responsive tracking-wide mb-6 font-bold text-textgray lg:text-medium text-[2rem] pb-0 lg:pb-2">
        Certificate Details Verification
      </h1>
      <div className="grid grid-cols-1 responsive lg:grid-cols-2 lg:gap-20">
        {/* COLUMN 1 */}
        <div>{/* Existing certificate image code */}</div>
        {/* COLUMN 2 */}
        <div className="flex flex-col lg:items-start">
          {/* First Row */}
          <div className="flex flex-col">
            <div>
              <p className="text-gray-800 text-[1.1rem]">
                Full name: <span className="font-light">Ge***ge Mi***is</span>
              </p>
              <p className="text-gray-800 text-[1.1rem]">
                Exam taker: <span className="font-light">Ge***ge Mi***is</span>
              </p>
              <p className="text-gray-800 text-[1.1rem]">
                Mint pass holder:{" "}
                <span className="font-light">Ge***ge Mi***is</span>
              </p>
              <p className="text-gray-800 text-[1.1rem]">
                ENS: <span className="font-light">Ge***ge Mi***is</span>
              </p>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-col pt-4">
            <div className="flex items-start">
              <div>
                <p className="text-gray-800 text-[1.1rem]">
                  KYC Verification:{" "}
                  <span className="font-light">
                    <FaCheck className="text-green-500" />
                  </span>
                </p>
                <p className="text-gray-800 text-[1.1rem]">
                  ENS Verification:{" "}
                  <span className="font-light">
                    <FaTimes className="text-red-500" />
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Third Row */}
          <div className="flex flex-col pt-4">
            <div className="flex items-start">
              <div>
                <p className="text-gray-800 text-[1.1rem]">
                  <FaClock className="text-yellow-500" />{" "}
                  <span className="ml-2">
                    <ReactFlow
                      elements={flowElements}
                      style={{ width: "300px", height: "150px" }}
                    >
                      <Controls />
                    </ReactFlow>
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Fourth Row */}
          <div className="flex flex-col pt-4">
            <div className="flex items-start">
              <div>
                <label className="text-gray-800 text-[1.1rem]">
                  <input
                    type="radio"
                    name="walletType"
                    value="examTaker"
                    checked
                    onChange={() => setIsOtherSelected(false)}
                  />{" "}
                  Exam taker wallet Mint pass holder
                </label>
                <br />
                <label className="text-gray-800 text-[1.1rem]">
                  <input
                    type="radio"
                    name="walletType"
                    value="other"
                    checked={isOtherSelected}
                    onChange={() => setIsOtherSelected(true)}
                  />{" "}
                  Other
                </label>
                {isOtherSelected && (
                  <input
                    type="text"
                    className="px-2 py-1 mt-2 border rounded"
                    placeholder="Enter your custom wallet type"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Center of the panel */}
          <div className="flex flex-col items-center mt-8">
            <label className="text-gray-800 text-[1.1rem]">
              <input
                type="checkbox"
                checked={isCheckbox1Checked}
                onChange={(e) => setIsCheckbox1Checked(e.target.checked)}
              />{" "}
              I verify the validity and accuracy of the data provided
            </label>
            <label className="text-gray-800 text-[1.1rem]">
              <input
                type="checkbox"
                checked={isCheckbox2Checked}
                onChange={(e) => setIsCheckbox2Checked(e.target.checked)}
              />{" "}
              I agree to be held solely responsible for the accuracy of the data
              provided
            </label>
            <label className="text-gray-800 text-[1.1rem]">
              <input
                type="checkbox"
                checked={isCheckbox3Checked}
                onChange={(e) => setIsCheckbox3Checked(e.target.checked)}
              />{" "}
              I verify that I am acting on my own behalf
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-8 space-x-4">
            <button
              className="px-4 py-2 text-base font-medium tracking-wide text-gray-600 duration-200 bg-white border-0 rounded-xl hover:bg-gray-200"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-base font-medium tracking-wide text-white duration-200 bg-gray-600 rounded-xl hover:bg-gray-800"
              onClick={handleSubmit}
              disabled={
                !(
                  isCheckbox1Checked &&
                  isCheckbox2Checked &&
                  isCheckbox3Checked
                )
              }
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateView;
