import React, { forwardRef } from "react";
import { ReactComponent as StarImg } from "../asset/별_심벌-05.svg";

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
      data-key1={prop.key1}
      data-key2={prop.key2}
      data-key3={prop.key3}
      onClick={prop.onClick}
      style={style}
    >
      <div className="item_img">
        <StarImg />
      </div>
      <div className="song_info">
        <span className="title">{prop.title}</span>
      </div>
    </div>
  );
};

export default forwardRef(Star);
