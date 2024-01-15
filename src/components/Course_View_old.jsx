import React, { Fragment, useState, useEffect } from "react"
import MarketplaceJSON from "../abis/course_mainet.json"
import Header from "./Navbar"
import Footer from "./Footer"
import { Link } from "react-router-dom"
import Image from "./base/Image"
import "../index.css"
import { useLocation } from "react-router"
import CardListCourse from "./CardListCourse"
import { useNavigate } from "react-router-dom"
import urlify from "../hooks/urlify"
import { RingLoader } from "react-spinners"
import { useAccount } from "wagmi"
import { useWeb3Modal } from "@web3modal/react"
import { usePublicClient } from "wagmi";
import { getContract, getWalletClient } from "wagmi/actions";import "react-responsive-modal/styles.css"
import { Dialog, Transition } from "@headlessui/react"
import { FaRegTimesCircle } from "react-icons/fa"

const About = () => {
  const { state } = useLocation()
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [dataFetched, updateFetched] = useState(false)
  const [openModal, setOpenModal] = useState(true)

  const { address } = useAccount()
  const provider = usePublicClient()

  const contract = getContract({
    address: MarketplaceJSON.address,
    abi: MarketplaceJSON.abi,
    signerOrProvider: provider,
  })

  const { open } = useWeb3Modal()
  useEffect(() => {
    // initiate web3modal
    scrolltoId()
    GetNFT()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])
  function scrolltoId() {
    var access = document.getElementById("courses4")
    access.scrollIntoView()
  }

  const some_item = {
    semester: "",
    course: "PUNK 6529",
    image: require("../assets/instructors/punk6529.jpg"),
    description: `Punk6529 is among the world’s foremost collectors, investors and thought leaders in the NFT space, well-known for his extensive tweetstorms on NFTs and decentralization.  6529 is a leading advocate of the “open metaverse” – namely that the architecture of the metaverse should be decentralized and interoperable and, specifically, that NFTs could serve in this role.
6529 is active in several key areas: a) the 6529 Museum is a very extensive NFT museum, with a particular focus on generative art; b) 6529 Capital is a leading asset manager in the NFT space, and c) OM, which is building an open, decentralized metaverse.`,
  }

  const another_item = {
    semester: "",
    course: "Prof. GEORGE GIAGLIS",
    image: require("../assets/instructors/george-giaglis.jpg"),
    description: `Professor George M. Giaglis is the Executive Director of the Institute for the Future at the University of Nicosia. He teaches three MOOCs at UNIC: Introduction to Digital Currencies; Introduction to DeFi; NFTs and the Metaverse; and was instrumental in designing the curriculum of the world’s first academic programs in this space.
He has also been working with institutional and corporate clients, including the European Commission and the European Central Bank, on blockchain and technology monitoring projects, as well as advisor to a number of technology companies. He has published 12 books and more than 150 scientific papers, and is the Chief Editor of the Blockchain Technologies section at Frontiers in Blockchain.`,
  }
  const data = new Set()
  data.add(some_item)
  data.add(another_item)

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

  async function switchAccount() {
    try {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      })
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Header />
      {loading ? (
        // ###### LOADING SPINNER ######
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
        // ######  HERO_IMAGE_OVERVIEW #####
        <>
          <div id="courses4">
            <div className="responsive">
              <div className="pt-24 pb-16 course-hero" id="courses4">
                <div className="">
                  <Image
                    src={state.item.image}
                    tw_css="max-w-[25.5rem] h-auto max-h-[23.25rem]"
                  />
                </div>
                <div className="pt-8 text-gray-700 lg:pt-0">
                  <div className="lg:text-medium text-[2rem]">
                    <h1>
                      {state.item.course}: <br /> {state.item.cname}
                    </h1>
                  </div>
                  <div className="lg:text-medium text-[2rem] lg:pt-36 pt-14">
                    <h1>OVERVIEW</h1>
                    <p
                      className="text-textgray md:pt-6 leading-7 lg:text-[20px] text-[16px]"
                      dangerouslySetInnerHTML={{
                        __html: urlify(state.item.description),
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>

            {!address ? (
              // ##### WALLET NOT CONNECTED ######
              <div className="bg-unic">
                <div className="responsive">
                  <div className="grid lg:grid-cols-2 grid-cols-1 justify-items-stretch min-h-[8rem]">
                    <div className="self-center py-6 text-gray-700 font-h1">
                      <h1
                        id="aceestext1"
                        className="mt-8 mb-1 text-large md:text-[2rem] font-h1 text-textgray"
                      >
                        THIS COURSE IS TOKEN GATED
                      </h1>
                      <h2
                        id="aceestext2"
                        className="font-thin text-small md:text-small font-p text-textgray mb-14"
                      >
                        Connect your wallet to view course materials.
                      </h2>
                    </div>
                    <div className="pb-6 m-auto font-p lg:py-6">
                      <button
                        style={{
                          zIndex: "100",
                          float: "left",
                          height: "3.125rem",
                          maxHeight: "100%",
                        }}
                        className="px-5 ml-auto mr-2 text-sm font-bold text-center bg-white rounded-lg cursor-pointer hover:bg-transparent w-fit text-textgray text-small font-p border-textgray hover:border-black hover:text-black"
                        onClick={() => open()}
                      >
                        {" "}
                        CONNECT YOUR WALLET
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {!dataFetched ? (
                  // ##### MODAL: WALLET CONNECTED-NO NFT #####
                  <div className="bg-unic">
                    <Transition appear show={openModal} as={Fragment}>
                      <Dialog
                        as="div"
                        className="fixed inset-0 z-20 overflow-y-auto"
                        onClose={() => setOpenModal(false)}
                      >
                        <div className="min-h-screen px-4 text-center bg-gray-400 bg-opacity-50">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Dialog.Overlay className="fixed inset-0" />
                          </Transition.Child>

                          <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                          >
                            &#8203;
                          </span>
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                              <Dialog.Title
                                as="h3"
                                className="flex items-center justify-between text-base font-medium leading-6 text-gray-900"
                              >
                                <div className="pl-4 mx-auto ">
                                  No Course Token found
                                </div>

                                <button
                                  className="text-black border-0 focus:outline-none"
                                  onClick={() => setOpenModal(false)}
                                >
                                  <FaRegTimesCircle className=" hover:text-gray-600" />
                                </button>
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="py-6 text-sm text-gray-500 border-t">
                                  {""}
                                </p>
                              </div>

                              <div className="mt-4">
                                <button
                                  type="button"
                                  className="inline-flex justify-center px-4 py-2 text-sm duration-300 bg-gray-700 border border-transparent rounded-md text-unic hover:bg-gray-500 hover:text-unic"
                                  onClick={switchAccount}
                                >
                                  Switch Wallet
                                </button>
                              </div>
                            </div>
                          </Transition.Child>
                        </div>
                      </Dialog>
                    </Transition>

                    {/* ##### WALLET CONNECTED-NO NFT ##### */}
                    <div className="responsive">
                      <div className="grid lg:grid-cols-2 grid-cols-1 justify-items-stretch min-h-[8rem]">
                        <div className="self-center py-6 text-gray-700 font-h1">
                          <h1
                            id="aceestext1"
                            className="mt-8 mb-1 text-large md:text-[2rem] font-h1 text-textgray"
                          >
                            THIS COURSE IS TOKEN GATED
                          </h1>
                          <h2
                            id="aceestext2"
                            className="font-thin text-small md:text-small font-p text-textgray mb-14"
                          >
                            Switch to wallet with a token to view course
                            materials.
                          </h2>
                        </div>
                        <div className="pb-6 m-auto font-p lg:py-6">
                          <React.Fragment>
                            <button
                              disabled={true}
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
                ) : (
                  //  ##### WALLET CONNECTED - ACCESS GRANTED #####
                  <>
                    <div className="bg-unic">
                      <div className="responsive">
                        <div className="grid lg:grid-cols-2 grid-cols-1 justify-items-stretch min-h-[8rem]">
                          <div className="self-center py-6 text-gray-700 font-h1">
                            <h1
                              id="aceestext1"
                              className="mt-8 mb-1 text-large md:text-[2rem] font-h1 text-textgray"
                            >
                              ACCESS GRANTED
                            </h1>
                            <h2
                              id="aceestext2"
                              className="font-thin text-small md:text-small font-p text-textgray mb-14"
                            >
                              You can now access course materials.
                            </h2>
                          </div>
                          <div className="pb-6 m-auto font-p lg:py-6">
                            <button
                              style={{ zIndex: "100", float: "left" }}
                              className="ml-auto w-[fit-content] text-textgray bg-white font-h1 text-medium hover:bg-transparent border-textgray hover:border-black hover:text-black font-medium rounded-lg text-sm px-5  text-center mr-2 "
                            >
                              {" "}
                              <Link
                                className="font-bold text-center cursor-pointer text-small font-p "
                                to="/explore"
                                onClick={(e) => {
                                  e.preventDefault()
                                  navigate("/explore", {
                                    state: { item: state.item },
                                  })
                                }}
                              >
                                VIEW COURSE MATERIALS
                              </Link>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            {/* ##### COURSE CONTENTS-COURSE INSTRUCTORS ##### */}
            <div className="responsive text-textgray py-14">
              <div className="">
                <h1 className="font-bold text-textgray lg:text-medium text-[2rem] pb-6">
                  COURSE INSTRUCTORS
                </h1>
              </div>
              <div>
                <CardListCourse disabled list={Array.from(data)} />
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  )
}

export default About
