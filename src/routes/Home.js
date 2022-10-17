import React, { useEffect, useRef, useState } from "react";

const Home = () => {
  const [select, setSelect] = useState([]);
  const [selectValue, setSelectValue] = useState([]);

  const selectedKey = useRef([]);

  const onClick = (event) => {
    const keyword_btn = event.target;
    keyword_btn.className === "off"
      ? (keyword_btn.className = "on")
      : (keyword_btn.className = "off");

    const selected = event.target.innerText;
    if (keyword_btn.className === "on") {
      setSelect([...select, selected]);
    } else if (keyword_btn.className === "off") {
      setSelect(select.filter((key) => key !== selected));
    }
  };

  useEffect(() => {
    // console.log("select: ", selectValue);
    for (let i = 0; i < selectedKey.current.length; ++i) {
      const keyValues = Object.values(selectedKey.current[i].dataset);
      const intersection = selectValue.filter((item) =>
        keyValues.includes(item)
      );
      if (selectValue.length !== intersection.length) {
        selectedKey.current[i].classList.add("hide");
      } else if (selectValue.length === intersection.length) {
        selectedKey.current[i].classList.remove("hide");
      }
    }
  }, [selectValue]);

  const activeFilter = (event) => {
    const keyword_btn = event.target;
    keyword_btn.className === "list"
      ? (keyword_btn.className = "list active")
      : (keyword_btn.className = "list");

    const selected = keyword_btn.innerText;
    const selectedValue = keyword_btn.dataset.filter;
    if (keyword_btn.className === "list active") {
      setSelect([...select, selected]);
      setSelectValue([...selectValue, selectedValue]);
    } else if (keyword_btn.className === "list") {
      setSelect(select.filter((key) => key !== selected));
      setSelectValue(selectValue.filter((key) => key !== selectedValue));
    }
  };
  return (
    <div className="container">
      <div className="nav">
        <h1>검색하기</h1>
        <form>
          <input type="text" />
          <button>검색하기</button>
        </form>
        <div className="keyword">
          <ul>
            <li>
              <span className="off" onClick={onClick}>
                키워드1
              </span>
            </li>
            <li>
              <span className="off" onClick={onClick}>
                키워드2
              </span>
            </li>
            <li>
              <span className="off" onClick={onClick}>
                키워드3
              </span>
            </li>
            <li>
              <span className="off" onClick={onClick}>
                키워드4
              </span>
            </li>
            <li>
              <span className="off" onClick={onClick}>
                키워드5
              </span>
            </li>
            <li>
              <span className="off" onClick={onClick}>
                키워드6
              </span>
            </li>
            <li>
              <span className="off" onClick={onClick}>
                키워드7
              </span>
            </li>
            <li>
              <span className="off" onClick={onClick}>
                키워드8
              </span>
            </li>
            <li>
              <span className="off" onClick={onClick}>
                키워드9
              </span>
            </li>
            <li>
              <span className="off" onClick={onClick}>
                키워드10
              </span>
            </li>
          </ul>
        </div>
        <h2>선택된 키워드</h2>
        <div className="selected">
          {select.map((key, index) => (
            <span key={index}>{key}</span>
          ))}
        </div>
        <div className="nav_toggle">검색</div>
      </div>
      <div className="star_filter">
        <ul>
          <li onClick={activeFilter} className="list" data-filter="first">
            #1집
          </li>
          <li onClick={activeFilter} className="list" data-filter="second">
            #2집
          </li>
          <li onClick={activeFilter} className="list" data-filter="space">
            #우주
          </li>
          <li onClick={activeFilter} className="list" data-filter="fall">
            #가을
          </li>
          <li onClick={activeFilter} className="list" data-filter="rock">
            #락
          </li>
        </ul>
        <div className="product">
          <div
            ref={(item) => (selectedKey.current[0] = item)}
            className="itemBox"
            data-key1="first"
            data-key2="fall"
          >
            <div className="item_img"></div>
            <div className="song_info">
              <span className="title">사건의 지평선</span>
              <div className="thumbnail"></div>
              <button className="song_play_btn">▶</button>
            </div>
          </div>
          <div
            ref={(item) => (selectedKey.current[1] = item)}
            className="itemBox"
            data-key1="second"
            data-key2="rock"
          >
            <div className="item_img"></div>
            <div className="song_info">
              <span className="title">사건의 지평선</span>
              <div className="thumbnail"></div>
              <button className="song_play_btn">▶</button>
            </div>
          </div>
          <div
            ref={(item) => (selectedKey.current[2] = item)}
            className="itemBox"
            data-key1="first"
            data-key2="space"
          >
            <div className="item_img"></div>
            <div className="song_info">
              <span className="title">사건의 지평선</span>
              <div className="thumbnail"></div>
              <button className="song_play_btn">▶</button>
            </div>
          </div>
          <div
            ref={(item) => (selectedKey.current[3] = item)}
            className="itemBox"
            data-key1="second"
            data-key2="fall"
            data-key3="space"
          >
            <div className="item_img"></div>
            <div className="song_info">
              <span className="title">사건의 지평선</span>
              <div className="thumbnail"></div>
              <button className="song_play_btn">▶</button>
            </div>
          </div>
          <div
            ref={(item) => (selectedKey.current[4] = item)}
            className="itemBox"
            data-key1="second"
            data-key2="rock"
            data-key3="fall"
          >
            <div className="item_img"></div>
          </div>
          <div
            ref={(item) => (selectedKey.current[5] = item)}
            className="itemBox"
            data-key1="first"
            data-key2="rock"
            data-key3="space"
          >
            <div className="item_img"></div>
            <div className="song_info">
              <span className="title">사건의 지평선</span>
              <div className="thumbnail"></div>
              <button className="song_play_btn">▶</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
