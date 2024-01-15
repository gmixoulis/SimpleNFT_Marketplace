import React from "react";

const Image = ({src, tw_css = ""}) => {

    return (
        <img className={"object-cover " + tw_css}
             src={src}
             alt=""
        />
    );
}

export default Image;