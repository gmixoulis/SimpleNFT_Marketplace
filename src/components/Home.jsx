import About from "./About";
import OurCourses from "./OurCourses";
import Hero from "./Hero";
import CourseVideo from "./CourseVideo";
import WorldLeaders from "./WorldLeaders";
import HomeVideo from "./HomeVideo";
import Lecturers from "./Lecturers";
import { client } from "../index";
import React, { useEffect } from "react";
import { getAllNFTs } from "../hooks/Fetchers";

 function App() {
   useEffect(() => {
    client.prefetchQuery({
      queryFn: () => getAllNFTs(),
      queryKey: "nfts",
    });
  },[]);
  return (
    <>
      <Hero />
      <About />
      <HomeVideo />
      <OurCourses />
      <Lecturers />
      <WorldLeaders />
      <CourseVideo />
    </>
  );
}

export default App;
