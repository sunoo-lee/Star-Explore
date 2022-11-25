import React, { useRef, useState, forwardRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Refresh } from "../asset/키워드_초기화.svg";
import { ReactComponent as Search } from "../asset/찾아보기_돋보기.svg";
import { ReactComponent as Enter } from "../asset/찾아보기_엔터.svg";

const Navigation = (prop, ref) => {
  const toggleBtn = useRef([]);
  let nav_toggle = useRef();
  const keyBtn_ref = useRef([]);
  const [nav, setNav] = useState("keyword");

  useEffect(() => {
    if (prop.keyState) {
      return;
    } else {
      for (let i = 0; i < keyBtn_ref.current.length; ++i) {
        keyBtn_ref.current[i].classList.remove("on");
      }
    }
  }, [prop.keyState]);

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
    const debounce = setTimeout(() => {
      sendRequest(value);
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
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
      .get(`http://localhost:8080/information/search=${input}`)
      .then((response) => setData(response.data));
  };

  return (
    <nav ref={nav_toggle} className={`nav ${nav}`}>
      <div className="nav_header">
        <div className="header_top">
          <div className="keyword_top">
            <h2>KEYWORD</h2>
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
            <div onClick={prop.onResetKey} className="refresh_btn">
              <Refresh />
            </div>
          </div>
          <div className="search_top">
            <h2>SEARCH</h2>
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
        </div>
      </div>
      <div className="keyword_search">
        <div className="keyword_wrap">
          <div className="keyword">
            <h2>emotion</h2>
            <ul className="key_1">
              {prop.keyword_list_1.map((item, index) => (
                <li data-filter={item.data} data-att={item.keyword} key={index}>
                  <span
                    ref={(item) => (keyBtn_ref.current[index] = item)}
                    className="btn"
                    onClick={prop.onClick}
                  >
                    {item.data}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="keyword">
            <h2>theme</h2>
            <ul className="key_2">
              {prop.keyword_list_2.map((item, index) => (
                <li data-filter={item.data} data-att={item.keyword} key={index}>
                  <span
                    ref={(item) => (keyBtn_ref.current[index + 15] = item)}
                    className="btn"
                    onClick={prop.onClick}
                  >
                    {item.data}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="keyword">
            <h2>genre</h2>
            <ul className="key_3">
              {prop.keyword_list_3.map((item, index) => (
                <li data-filter={item.data} data-att={item.keyword} key={index}>
                  <span
                    ref={(item) => (keyBtn_ref.current[index + 27] = item)}
                    className="btn"
                    onClick={prop.onClick}
                  >
                    {item.data}
                  </span>
                </li>
              ))}
            </ul>
          </div>
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
              <Search />
              {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
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
