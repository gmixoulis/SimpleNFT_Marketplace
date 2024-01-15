import React from "react"
import Image from "../assets/UNIC-header-logo-white.svg"
import { FaDiscord } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaMailBulk } from "react-icons/fa"

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col flex-grow w-full  lg:grid lg:grid-cols-5">
        <div className="flex items-center justify-center py-10 -mb-1 -mr-1 bg-gray-700 lg:col-span-4 lg:flex lg:items-center lg:justify-start lg:pl-60">
          <img src={Image} alt="logo" className="w-60" />
        </div>

        <div className="flex flex-col items-center justify-center -mb-1 text-white bg-gray-700">
        
          <div className="flex items-center justify-center pb-4">
            <a
              href="mailto:admissions@unic.ac.cy"
              rel="noreferrer"
              target="_blank"
              className="p-2 mx-3 bg-red-700 rounded-md hover:text-white hover:bg-red-500 hover:duration-150"
            >
              <FaMailBulk size={15} />
            </a>
            <a
              href="https://discord.gg/joinUNIC"
              rel="noreferrer"
              target="_blank"
              className="p-2 mx-1 bg-red-700 rounded-md hover:text-white hover:bg-red-500 hover:duration-150"
            >
              <FaDiscord size={15} />
            </a>
            <a
              href="https://twitter.com/unicmetaverse"
              rel="noreferrer"
              target="_blank"
              className="p-2 mx-3 bg-red-700 rounded-md hover:text-white hover:bg-red-500 hover:duration-150"
            >
              <FaTwitter size={15} />
            </a>
          </div>
        </div>
      </footer>
      <div className="py-2 font-light text-center text-white bg-black  lg:px-60 lg:text-left">
        Copyright © University of Nicosia. All Rights Reserved |{" "}
        <a
          href="https://www.unic.ac.cy/privacy-policy/"
          rel="noreferrer"
          className="text-white hover:text-gray-300"
        >
          Privacy Policy {""}
        </a>
        |{" "}
        <a
          href="https://www.unic.ac.cy/terms-and-conditions/"
          target="_blank"
          rel="noreferrer"
          className="text-white hover:text-gray-300"
        >
          Terms & Conditions
        </a>
      </div>
    </>
  )
}

export default Footer
