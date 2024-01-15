import React from "react";

const Card = React.forwardRef(
  ({ width = "300px", height = "300px", child, onClick }, ref) => (
    <div
      style={{
        width: `${width}`,
        height: `${height}`,
      }}
      onClick={onClick}
      ref={ref}
    >
      {child}
    </div>
  )
);

export default Card;
