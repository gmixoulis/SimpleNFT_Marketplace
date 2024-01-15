import { FaChevronDown } from "react-icons/fa"
import { FaChevronUp } from "react-icons/fa"
import { useState } from "react"
import Certificate from "../assets/certificate1.png"

export default function CertificateDetails() {
  const [expand, setExpand] = useState(false)

  return (
    <>
      <h1 className="responsive font-bold text-textgray lg:text-medium text-[2rem] pb-0 lg:pb-2">
        CERTIFICATE DETAILS
      </h1>
      <div className="responsive grid grid-cols-1 xl:grid-cols-2">
        {/* COLUMN 1 */}
        <div>
          <img src={Certificate} alt="Certificate" className="w-[35rem]" />
        </div>
        {/* COLUMN 2 */}
        <div className="flex flex-col xl:items-center sm:bg-purple-400 md:bg-green-500 lg:bg-red-500 xl:bg-yellow-400 2xl:bg-blue-500">
          <div className=" flex flex-col">
            <div>
              <p className="text-gray-800">
                Redeem: <span className="font-light"> burn/claim</span>
              </p>
              <p className="text-gray-800">
                Price:<span className="font-light"> 0.25 Ξ</span>
              </p>
              <p className="text-gray-800">
                Eligibility:
                <span className="font-light"> Pass-grade/Pass-fail</span>
              </p>
              <p className="text-gray-800">
                Token Standard:
                <span className="font-light"> ERC-721</span>
              </p>
              <p className="text-gray-800">
                Blockchain:<span className="font-light"> Ethereum </span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <button
                onClick={() => setExpand(!expand)}
                className="flex w-[8.5rem] h-[2.5rem] items-center text-gray-200 border-0 bg-gray-600 px-4 py-2 font-medium text-base tracking-wide rounded-xl hover:bg-gray-800 hover:text-white duration-200"
              >
                CLAIM
                {expand ? (
                  <span className="ml-5">
                    <FaChevronUp size={20} />
                  </span>
                ) : (
                  <span className="ml-5">
                    <FaChevronDown size={20} />
                  </span>
                )}
              </button>
              {expand ? (
                <button className="flex items-center text-gray-200 border-0 bg-gray-600 px-4 py-2 font-medium text-base tracking-wide rounded-xl hover:bg-gray-800 hover:text-white duration-200">
                  DELEGATE
                </button>
              ) : (
                <></>
              )}
            </div>

            <button className="text-gray-200 flex items-center mx-auto justify-center h-[2.5rem] w-[6rem] border-0 bg-gray-600 px-4 py-2 font-medium text-base tracking-wide rounded-xl hover:bg-gray-800 hover:text-white duration-200">
              VIEW
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
