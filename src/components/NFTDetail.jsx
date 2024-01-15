import React from "react"
import { useLocation } from "react-router"
import Header from "./Navbar"
import Footer from "./Footer"
import "../styles/NFTDetail.css"
import NotFound from "./404"
import classnames from "classnames"
import { Disclosure, Transition } from "@headlessui/react"
import { FaChevronDown } from "react-icons/fa"

import meta511 from "../abis/meta511materials.json"
//import NotConnectedWallet from "../hooks/NotConnectedWallet";
import urlify from "../hooks/urlify"
import refreshPage from "../hooks/refreshPageNFT"
const EmptyState = () => {
  return <NotFound />
}
const NFTDetail = () => {
  const { state } = useLocation()
  if (state === null) return <EmptyState />
  window.onbeforeunload = function () {
    window.scrollTo(0, 0)
  }
  return (
    <main>
      <div className="flex flex-col justify-center min-h-screen min-w-screen">
        <Header />

        <div className="p-8 flex items-center flex-grow">
          <div className="lg:grid lg:grid-cols-2 h-full">
            {/* column_1 */}
            <div className="pt-20">
              <div className="flex items-center justify-center">
                <img className="w-3/5" src={state.item.image} alt="" />
              </div>
              {state.item.uri < 13 ? (
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={classnames(
                          "flex w-3/5 mx-auto justify-between rounded-none bg-gray-800 border-2 border-slate-300 px-4 py-2 mt-8 text-sm font-light hover:bg-gray-700 hover:duration-200 focus:outline-none",
                          { "bg-gray-700": open }
                        )}
                      >
                        <span className="text-unic">Course Details</span>
                        <FaChevronDown
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5 text-unic`}
                        />
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="w-3/5 mx-auto px-4 pt-4 pb-2 text-small font-light text-black">
                          <div
                            data-widget="m-listing-attributes"
                            data-id={
                              meta511.meta511[state.item.uri]["listing-id"]
                            }
                            data-network="1"
                          ></div>
                          <div className="text-center">
                            <a
                              href="https://www.unic.ac.cy/coronavirus/"
                              className="hover:text-gray-500"
                            >
                              View Cookie Policy
                            </a>
                          </div>
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              ) : (
                <div />
              )}
            </div>

            {/* column_2 */}
            <div className="lg:pt-20 lg:px-20">
              <p className="uppercase text-black text-small">
                {state.item.course}:
              </p>

              <p className="uppercase text-black text-small">
                {state.item.cname}
              </p>

              <p className="text-black text-3xl">{state.item.name}</p>

              <div className="text-textgray font-thin text-small">
                <p className="text-textgray font-thin  text-small">
                  Contract: 0x4E2d9546CCFEc5B126706e02aFD329ef53B3Ae01
                </p>
                <p className="text-textgray font-thin text-small">
                  {" "}
                  Token ID: {state.item.uri}
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: urlify(state.item.description),
                  }}
                />
              </div>

              {state.item.uri < 13 ? (
                <>
                  <div
                    data-widget="m-listing-links"
                    data-id={meta511.meta511[state.item.uri]["listing-id"]}
                    data-network="1"
                    className="py-5"
                  ></div>
                  <br></br>
                  <div
                    data-widget="m-listing-bid-form"
                    data-id={meta511.meta511[state.item.uri]["listing-id"]}
                    data-network="1"
                  ></div>
                </>
              ) : (
                <>
                  <div
                    id="claim"
                    data-widget="m-claim-complete"
                    data-id={meta511.meta511[state.item.uri]["listing-id"]}
                    data-campaign="claim"
                    data-network="1"
                  />
                  {document.getElementById("claim")?.innerHTML !== "undefined"
                    ? refreshPage()
                    : console.log(
                        "ok",
                        document.getElementById("claim")?.innerHTML
                      )}
                </>
              )}
              <div>
                <p className="text-center text-[0.8rem] font-normal mt-10 text-textgray  text-p">
                  Powered by Manifold
                </p>
                <hr className="h-px my-1 bg-gray-200 border-0 mb-9 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}

export default NFTDetail
