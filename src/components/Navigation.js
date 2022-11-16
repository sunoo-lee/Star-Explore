import React, { useRef, useState, forwardRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faMagnifyingGlass,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = (prop, ref) => {
  const toggleBtn = useRef([]);
  let nav_toggle = useRef();
  const [nav, setNav] = useState("keyword");

  const setKeyword = () => {
    toggleBtn.current[0].classList.add("active");
    toggleBtn.current[1].classList.remove("active");
    setNav("keyword");
  };
  const setSearch = () => {
    toggleBtn.current[0].classList.remove("active");
    toggleBtn.current[1].classList.add("active");
    setNav("search");
  };

  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };

  const recommend = useRef();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (value === "") {
      recommend.current.classList.remove("active");
    } else {
      recommend.current.classList.add("active");
    }
    sendRequest(value);
    console.log(data);
  }, [value]);

  const sendRequest = async (input) => {
    if (
      input === "" ||
      input === "." ||
      input === ".." ||
      input === "/" ||
      input === "//" ||
      input === "#" ||
      input === "##"
    ) {
      return;
    }
    axios
      .get(`http://localhost:8080/songInformation/search=${input}`)
      .then((response) => setData(response.data));
  };

  return (
    <nav ref={nav_toggle} className={`nav ${nav}`}>
      <div className="nav_header">
        <div className="header_top">
          <h1>{nav}</h1>
          <div className="nav_tabs">
            <div
              ref={(item) => (toggleBtn.current[0] = item)}
              onClick={setKeyword}
              className="tab_button active"
            ></div>
            <div
              ref={(item) => (toggleBtn.current[1] = item)}
              onClick={setSearch}
              className="tab_button"
            ></div>
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
            {prop.keyword_list_1.map((item, index) => (
              <li data-filter={item.data} key={index}>
                <span className="btn" onClick={prop.onClick}>
                  {item.keyword}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="keyword">
          <h2>theme</h2>
          <ul className="key_2">
            {prop.keyword_list_2.map((item, index) => (
              <li data-filter={item.data} key={index}>
                <span className="btn" onClick={prop.onClick}>
                  {item.keyword}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="keyword">
          <h2>genre</h2>
          <ul className="key_3">
            {prop.keyword_list_3.map((item, index) => (
              <li data-filter={item.data} key={index}>
                <span className="btn" onClick={prop.onClick}>
                  {item.keyword}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="title_search">
        <form autoComplete="off" className="search_form">
          <div className="input_box">
            <input
              type="text"
              name="search"
              id="search_box"
              placeholder="제목으로 검색"
              onChange={onChange}
              value={value}
            />
            <span>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </div>
          <div ref={recommend} id="recommend">
            <ul>
              {data ? (
                data.map((item, index) => (
                  <li className="item" key={index}>
                    {item.song_title}
                    <span>
                      <FontAwesomeIcon icon={faArrowUp} />
                    </span>
                  </li>
                ))
              ) : (
                <li className="item">결과 없음</li>
              )}
            </ul>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default forwardRef(Navigation);
