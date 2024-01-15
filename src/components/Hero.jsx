import React from "react"

const Hero = () => {
  function scrolltoId() {
    var access = document.getElementById("ourcourses")
    access.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <div className="flex flex-col w-auto h-auto bg-unic ">
      <div className="responsive font-h1">
        <div className="justify-center w-full col-span-2 px-0 py-16 md:items-start md:px-2 md:py-28">
          <div>
            <h1 className="py-3 md:text-large sm:text-medium text-[2rem] text-textgray">
              THE FUTURE <br /> OF EDUCATION IS NOW
            </h1>
            <h2 className="md:text-medium text-[2rem] text-textgray font-bold">
              Decentralised, On-Chain and in the Metaverse
            </h2>
          </div>
          <button
            /* onClick={address == null ? two : console.log("connected")}*/
            onClick={() => scrolltoId()}
            className="md:text-[1.5rem] text-[1.5rem] h-auto sm:w-auto md:w-[16.8rem] m-auto font-bold
            border-2 rounded-2xl bg-transparent border-border text-textgray hover:text-black my-12"
          >
            <div className="mx-2 md:mx-0">VIEW COURSES</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
