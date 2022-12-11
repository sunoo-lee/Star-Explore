import React, { memo, useRef } from "react";
import "./Intro.css";

const Intro = () => {
  const modal_ref = useRef();
  const onClick = () => {
    modal_ref.current.style.display = "none";
  };
  return (
    <div ref={modal_ref} className="intro_modal">
      <div className="intro_wrap">
        <div className="intro_container">
          <div onClick={onClick} className="intro_btn"></div>
          <div className="inner_img"></div>
        </div>
      </div>
    </div>
  );
};

export default memo(Intro);
