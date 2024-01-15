import React from 'react';
import preview from "../assets/OM-preview_1.mp4";

const HomeVideo = () => {
    return (
        <div className='w-full'>
            <video
                src={preview} autoPlay="{true}" loop muted
                className="w-auto min-w-full min-h-full sm:max-w-50"
            >
                {" "}
            </video>
        </div>
    );
};

export default HomeVideo;
