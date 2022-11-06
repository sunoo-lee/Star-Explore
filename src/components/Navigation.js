import React, { useRef, useState, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";

const Navigation = (prop, ref) => {
  const toggleBtn = useRef();
  let nav_toggle = useRef();
  const [nav, setNav] = useState(false);

  const navToggle = () => {
    toggleBtn.current.classList.toggle("active");
    nav_toggle.current.classList.toggle("active");
    document.body.classList.toggle("stop-scroll", nav);
    setNav(!nav);
  };

  return (
    <nav ref={nav_toggle} className="nav active">
      <div className="nav_header">
        <div className="header_top">
          <h1>keyword</h1>
          <div className="nav_tabs">
            <div className="tab_button active"></div>
            <div className="tab_button"></div>
          </div>
        </div>
        <div className="refresh_btn">
          <FontAwesomeIcon icon={faArrowRotateRight} />
        </div>
      </div>
      <div className="keyword_search">
        <div className="keyword">
          <h2>emotion</h2>
          <ul className="key_1">
            {prop.keyword_list.map((item, index) => (
              <li data-filter={item.data} key={index}>
                <span onClick={prop.onClick}>{item.keyword}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="keyword">
          <h2>theme</h2>
          <ul className="key_2">
            {prop.keyword_list.map((item, index) => (
              <li data-filter={item.data} key={index}>
                <span onClick={prop.onClick}>{item.keyword}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="keyword">
          <h2>genre</h2>
          <ul className="key_3">
            {prop.keyword_list.map((item, index) => (
              <li data-filter={item.data} key={index}>
                <span onClick={prop.onClick}>{item.keyword}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default forwardRef(Navigation);
