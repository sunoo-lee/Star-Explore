import React, { forwardRef } from "react";

const Info = (prop, ref) => {
  const style = {
    left: `${prop.x}px`,
    top: `${prop.y}px`,
    // transform: `translate(-50%}px, ${heightOffset}px)`,
  };

  return (
    <div ref={ref} style={style} className={`song_info ${prop.size}`}>
      <span className="title">{prop.title}</span>
    </div>
  );
};

export default forwardRef(Info);
