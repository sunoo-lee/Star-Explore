import React, { useRef } from "react";
import "./Intro.css";
import { ReactComponent as Intro_img } from "../asset/img_cloud.svg";

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
          <div className="inner_text">
            <p>
              <span>16</span>th
            </p>
            <span>anniversary</span>
            <span>2008.12.17</span>
            <span>YOUNHA Debut</span>
            <hr />
            <span>키워드와 검색으로</span>
            <span>윤하의 노래를</span>
            <span>탐험하세요.</span>
          </div>
          <div className="inner_img">{/* <Intro_img /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
