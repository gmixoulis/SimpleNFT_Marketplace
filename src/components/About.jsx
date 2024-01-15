import React from "react";
import Laptop from "../assets/classroom.png";
import Image from "./base/Image";

const About = () => {
    return (
        <div className="w-auto h-auto flex flex-col">
            <div className="responsive">
                <div className="grid lg:grid-cols-1 xl:grid-cols-2 justify-evenly
                md:items-start w-full sm:px-0 px-2 pt-16 pb-24">
                    <div>
                        <h1 className="md:text-medium text-[2rem] text-textgray mb-14">
                            WELCOME <br/> TO YOUR CLASSROOM
                        </h1>
                        <p
                            style={{maxWidth: "85%"}}
                            className="text-black md:text-small text-[1rem]"
                        >
                            The course will take place in specially designed virtual auditoriums
                            inside OM Punk 6529s Open Metaverse.
                            <br/>
                            Our goal is to see if we can deliver a course 100% on-chain and in
                            the metaverse.
                            <br/>
                            Adjacent to your classroom is the 6529 Museum District, home to one
                            of the leading NFT collections in the world, spread across 20+
                            galleries, as well as a growing ecosystem of artist and collector
                            galleries in the surrounding areas.
                        </p>
                    </div>
                    <div className="m-auto pt-12 xl:pt-0">
                        <Image
                            src={Laptop}
                            tw_css={"md:max-w-[33.5rem] max-w-full md:max-h-[23.25rem] h-auto object-fill"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
