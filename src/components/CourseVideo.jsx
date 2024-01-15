import React from "react"
import overview from "../assets/unic-overview.mp4"

const CourseVideo = () => {
  return (
    <div className="'w-full -mb-[7%]">
      <video
        src={overview}
        autoPlay="{true}"
        loop
        muted
        className="w-auto min-w-full min-h-full sm:max-w-50 -pb-4"
      ></video>
    </div>
  )
}

export default CourseVideo
