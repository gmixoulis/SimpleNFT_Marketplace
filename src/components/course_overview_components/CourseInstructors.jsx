import React from "react"
import Carousel from "./CarouselInstructors"

const CourseInstructors = ({ Data }) => {
  return (
    <>
      <div className="py-28">
        <div className="responsive">
          <h1 className="font-bold tracking-wide mb-6 text-textgray lg:text-medium text-[2rem] pb-2">
            COURSE INSTRUCTORS
          </h1>
          <Carousel />
        </div>
      </div>
      {/* GUEST LECTURERS */}
      <div className="bg-unic">
        <div className="responsive py-28">
          <h1 className="md:text-medium text-[2rem] font-bold text-textgray py-4 tracking-wide mb-6">
            GUEST LECTURERS
          </h1>
          <div className="w-full h-[30rem] overflow-auto">
            <div className="flex m-auto md:mx-auto lg:mx-auto">
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-3 lg:grid md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-8 md:mx-auto lg:mx-auto">
                {Data.guestSpeakers.map(({ name, title, job }, idx) => (
                  <li
                    key={idx}
                    className="col-span-1 row-span-3 py-10 pt-6 pb-10 text-lg font-bold"
                  >
                    <img
                      src={"/instructors/punk6529.jpg"}
                      className="border-2 border-black rounded-lg"
                      alt=""
                    />
                    <div className="text-center md:text-left">
                      <p className=" font-semibold text-textgray text-small">
                        {name}
                      </p>
                      <p className="font-light text-textgray text-small">
                        {title}
                      </p>
                      <p className="font-light text-textgray text-small">
                        {job}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseInstructors
