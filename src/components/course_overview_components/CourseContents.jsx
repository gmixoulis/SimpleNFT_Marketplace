import React from "react"
import { Transition, Disclosure } from "@headlessui/react"
import classnames from "classnames"
import { FaChevronDown } from "react-icons/fa"
const Course_Contents = ({ Data }) => {
  const getDurationInSeconds = (duration) => {
    const [minutes, seconds] = duration.split(":")
    return parseInt(minutes) * 60 + parseInt(seconds)
  }

  const getTotalVideoDuration = () => {
    return Data.courseContents.map((chapter) => ({
      chapterName: chapter.chapterName,
      totalDuration: chapter.lessons.reduce(
        (total, lesson) => total + getDurationInSeconds(lesson.videoDuration),
        0
      ),
    }))
  }

  const videoDurations = getTotalVideoDuration()

  const durationTimeFixed = () => {
    return videoDurations.map((duration) => {
      let minutes = Math.floor(duration.totalDuration / 60)
      const seconds = duration.totalDuration % 60
      let hours = 0

      if (minutes >= 60) {
        hours = Math.floor(minutes / 60)
        minutes = minutes % 60
      }

      return { hours, minutes }
    })
  }

  const videoDurationsFixed = durationTimeFixed()
  console.log(videoDurationsFixed[0].hours)

  return (
    <div className="responsive my-28">
      <h1 className="font-bold tracking-wide mb-6 text-textgray lg:text-medium text-[2rem] pb-0 lg:pb-2">
        COURSE CONTENTS
      </h1>
      <div className="border border-b-0 border-gray-500 rounded-none bg-unic lg:mt-2 border-x-0 border-t-1">
        {Data.courseContents.map((content, idx) => (
          <Disclosure as="div" key={idx}>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={classnames(
                    "flex w-full justify-between rounded-none bg-unic border-1 border-gray-500 border-t-0 px-4 py-4 hover:bg-gray-300 hover:duration-200 focus:outline-0",
                    { "bg-gray-300": open }
                  )}
                >
                  <span className="text-base font-light text-black">
                    {content.chapterName}
                  </span>
                  <div className="flex items-center">
                    <p className="text-[1rem] font-light text-gray-600 px-4">
                      {content.lessons.length} lectures
                    </p>
                    <p className="text-[1rem] font-light text-gray-600 pr-4">
                      {videoDurationsFixed[idx].hours}hr{" "}
                      {videoDurationsFixed[idx].minutes}mins
                    </p>
                    <FaChevronDown
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-black`}
                    />
                  </div>
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="py-2 pl-8 font-light text-black border border-t-0 border-gray-500 text-small">
                    <ul className="list-disc">
                      {content.lessons.map(
                        ({
                          id,
                          lessonTitle,
                          videoDuration,
                          previewAvailable,
                        }) => (
                          <li className="w-full px-0 py-1" key={id}>
                            <div className="flex justify-between">
                              <div>{lessonTitle}</div>
                              <div className="flex items-center pr-4">
                                {previewAvailable && (
                                  <button className="px-2 text-blue-500 border-none hover:text-blue-800">
                                    preview
                                  </button>
                                )}

                                <div className=" text-textgray">
                                  {videoDuration}
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  )
}

export default Course_Contents
