import React, { forwardRef } from "react";

const Star = (prop, ref) => {
  const style = {
    position: "absolute",
    left: `${prop.x}px`,
    top: `${prop.y}px`,
  };

  return (
    <div
      ref={ref}
      className="itemBox"
      data-title={prop.title}
      data-key1={prop.key1}
      data-key2={prop.key2}
      data-key3={prop.key3}
      data-genre={prop.key4}
      data-theme1={prop.key5}
      data-theme2={prop.key6}
      data-theme3={prop.key7}
      onClick={prop.onClick}
      style={style}
      // onMouseOver={prop.mouse}
      // onMouseOut={prop.mouse}
      onMouseEnter={prop.mouseenter}
      onMouseLeave={prop.mouseleave}
    >
      <div className="item_img">
        <div className={prop.size}></div>
      </div>
    </div>
  );
};

export default forwardRef(Star);
