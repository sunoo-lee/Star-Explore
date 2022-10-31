import {
  faMagnifyingGlass,
  faPlay,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState, forwardRef } from "react";

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
    <nav>
      <div ref={nav_toggle} className="nav active">
        <form className="search_form" onSubmit={prop.onSubmit}>
          <input type="text" placeholder="사건의 지평선" />
          <button>검색</button>
        </form>
        <div className="keyword_search">
          <div className="keyword">
            <ul>
              {prop.keyword_list.map((item, index) => (
                <li data-filter={item.data} key={index}>
                  <span onClick={prop.onClick}>{item.keyword}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="search">
          <span className="search_title">{prop.playerTag[0]}</span>
          <div className="search_img"></div>
          <ul className="search_keywords">
            <li>{prop.playerTag[1]}</li>
            <li>{prop.playerTag[2]}</li>
            <li>{prop.playerTag[3]}</li>
            <li>{prop.playerTag[4]}</li>
          </ul>
          <button className="search_play_btn">
            <FontAwesomeIcon icon={faPlay} />
          </button>
        </div>
        <div ref={toggleBtn} className="nav_toggle active" onClick={navToggle}>
          {nav ? (
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          ) : (
            <FontAwesomeIcon icon={faXmark} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default forwardRef(Navigation);
