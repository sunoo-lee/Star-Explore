import React, { useMemo, memo, useRef, useState, useEffect } from "react";
import "./Intro.css";
import Intro_web from "../asset/intro_web.png";
import Intro_mobile from "../asset/intro_mobile.png";

const Intro = () => {
  const modal_ref = useRef();
  const [modeToggle, setModeToggle] = useState(false);
  const screen_width = useMemo(() => {
    return document.body.offsetWidth;
  }, []);

  const onModToggle = () => {
    setModeToggle(screen_width < 820 ? true : false);
  };

  useEffect(() => {
    onModToggle();
  }, []);

  const onClick = () => {
    modal_ref.current.style.display = "none";
  };
  return (
    <div ref={modal_ref} className="intro_modal">
      <div className="intro_wrap">
        <div className="intro_container">
          <div className="inner_img">
            <img
              src={modeToggle ? Intro_mobile : Intro_web}
              alt="intro modal"
            />
            <div onClick={onClick} className="intro_btn"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Intro);
