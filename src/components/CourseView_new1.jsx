import React, { useState, useEffect } from "react"
import MarketplaceJSON from "../abis/course_mainet.json"
import Header from "./Navbar"
import Footer from "./Footer"
import Image from "./base/Image"
import "../index.css"
import { useLocation } from "react-router"
import urlify from "../hooks/urlify"
import { RingLoader } from "react-spinners"
import { useAccount } from "wagmi"
import { useWeb3Modal } from "@web3modal/react"
import { useContract, useProvider } from "wagmi"
import "react-responsive-modal/styles.css"
import Data from "../assets/data.json"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import { GiCheckMark } from "react-icons/gi"
import data1 from "../abis/data.json"
import Countdown from "react-countdown"
import { ReactComponent as OpenSeaIcon } from "../assets/opensea.svg"
import { ReactComponent as EtherscanIcon } from "../assets/etherscan.svg"
import CourseContents from "./course_overview_components/CourseContents"
import AccessGranted from "./course_overview_components/AccessGranted"
import TokenGated from "./course_overview_components/TokenGated"
import CertificateView from "./course_overview_components/CertificateView"
import FAQ from "./course_overview_components/FAQ"
import CourseInstructors from "./course_overview_components/CourseInstructors"

const CourseView = () => {
  const { state } = useLocation()
  const [loading, setLoading] = useState(false)
  const [dataFetched, updateFetched] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const { address } = useAccount()
  const provider = useProvider()
  const contract = useContract({
    address: MarketplaceJSON.address,
    abi: MarketplaceJSON.abi,
    signerOrProvider: provider,
  })
  const { open } = useWeb3Modal()

  useEffect(() => {
    // initiate web3modal
    GetNFT()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  async function GetNFT() {
    let transaction
    try {
      transaction = await contract.balanceOf(address)
    } catch (e) {
      console.log("not connected")
    }
    if (Number(transaction) > 0) {
      updateFetched(true)
    } else {
      updateFetched(false)
    }
  }

  const Completionist = () => <span>The course has started!</span>

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />
    } else {
      return (
        <p className="ml-auto font-bold text-textgray font-p ">
          {" "}
          Time remaining: {days}D:{hours}H:{minutes}M:{seconds}S
        </p>
      )
    }
  }

  return (
    <>
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
          <div id="courses4">
            <div className="responsive">
              <div className="pt-24 pb-10 course-hero" id="courses4">
                <div className="">
                  <Image
                    src={data1.image}
                    tw_css="max-w-[25.5rem] h-auto max-h-[23.25rem]"
                  />
                  <br />
                  <div>
                    <p className="text-small">
                      {" "}
                      Semester: {data1.semester} <br />
                      Year: {data1.year} <br />
                      Available Positions: {data1.availablePosotions} <br />
                      Duration: {data1.duration}
                      <br />
                      Enrolment fee: {data1.enrollmentFee} <br />
                      Mode: {data1.mode}
                      <br />
                      Prerequisites: {data1.prerequisites}
                      <br />
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <a
                      href="https://opensea.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-2"
                    >
                      <OpenSeaIcon className="w-8 h-8" />
                    </a>
                    <a
                      href="https://etherscan.io"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <EtherscanIcon className="w-8 h-8" />
                    </a>
                  </div>
                </div>
                <div className="pt-8 text-gray-700 lg:pt-0">
                  <div className="lg:text-medium text-[2rem]">
                    <h1>
                      {data1.courseID}: <br /> {data1.courseName}
                    </h1>
                  </div>
                  <div className="lg:text-medium  text-[2rem] ">
                    <p className="text-textgray md:pt-6 leading-7 lg:text-[20px] text-[16px]"></p>
                  </div>
                  <div className="top-0 flex flex-wrap items-center">
                    <div className="items-center float-right w-1/3 ">
                      <p classname="items-center pr-0 mx-0 text-small text-textgray py-auto">
                        Skills you will acquire:
                      </p>
                    </div>
                    <div className="float-left w-2/3">
                      <ul className="flex float-left gap-1 mt-1 bg-center ">
                        {data1.skills.map((item, index) => (
                          <li key={index} className=" text-[15px] pl-0 font-p">
                            <span className="inline-flex items-center px-2 font-thin rounded-md text-textgray text-p bg-gray-50 ring-1 ring-inset ring-gray-500/10">
                              {item}
                            </span>{" "}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:text-medium text-[2rem] lg:pt-26 pt-10">
                      <h1>OVERVIEW</h1>
                      <p className="text-textgray md:pt-6 leading-7 lg:text-[20px] text-[16px]">
                        {data1.description}
                      </p>
                    </div>
                    {new Date() > Date.parse(data1.dataStart) ? (
                      <div className="container grid text-left items-left">
                        <div className="row">
                          <div className="m-auto font-p lg:py-6">
                            <button
                              className=" w-[8.5rem] h-[2.5rem] items-center text-gray-200 border-0 bg-gray-600 px-4 py-2 font-medium  tracking-wide rounded-xl hover:bg-gray-800 hover:text-white duration-200"
                              onClick={() => open()}
                            >
                              {" "}
                              CLAIM
                            </button>
                          </div>
                        </div>
                        <div className="row ">
                          {" "}
                          <Countdown
                            className="cursor-default "
                            date={data1.dataStart}
                            renderer={renderer}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        {!address ? (
                          <TokenGated connected={false} />
                        ) : (
                          <>
                            {!dataFetched ? (
                              <>
                                <TokenGated connected={true} />
                              </>
                            ) : (
                              <>
                                <AccessGranted state={state} />
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <>
              <div className="bg-unic">
                <div className="responsive py-28">
                  <h1 className="lg:text-medium tracking-wide text-[2rem] text-gray-700 py-2 mb-6">
                    WHAT YOU WILL LEARN
                  </h1>
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {Data.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-start py-2 font-light"
                      >
                        <span>
                          <GiCheckMark className="mt-1 mr-1" />
                        </span>

                        {skill.description}
                      </div>
                    ))}
                  </div>
                  {showMore ? (
                    <>
                      <div className="flex flex-col py-8">
                        {Data.extraContent.map(({ id, content, title }) => (
                          <>
                            <div className="flex flex-col pb-4 border-r-2 border-gray-400">
                              <h1 className="text-base font-medium text-black">
                                {title}
                              </h1>
                              <p className="font-light text-gray-700 text-small">
                                {content}
                              </p>
                            </div>
                          </>
                        ))}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="flex justify-start w-full ">
                    <button
                      className="text-base border-0 text-textgray hover:text-gray-800 hover:underline"
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? (
                        <div className="flex items-center">
                          <div className="pr-2">Show less</div>
                          <span>
                            <FaChevronUp />
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="pr-2">Show more</div>
                          <span>
                            <FaChevronDown />
                          </span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </>
            <CourseContents Data={Data} />
            <CertificateView Data={data1} />
            <CourseInstructors Data={Data} />
            <FAQ Data={Data} />
          </div>
        </>
      )}
      <Footer />
    </>
  )
}

export default CourseView
