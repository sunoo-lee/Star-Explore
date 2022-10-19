import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [select, setSelect] = useState([]);
  const [selectValue, setSelectValue] = useState([]);

  const selectedKey = useRef([]);
  const nav_toggle = useRef();

  const onClick = (event) => {
    const keyword_btn = event.target;
    keyword_btn.classList.toggle("on");

    const selected = event.target.innerText;
    const selectedValue = keyword_btn.parentElement.dataset.filter;
    console.dir(selectedValue);

    if (keyword_btn.className === "on") {
      setSelect([...select, selected]);
      setSelectValue([...selectValue, selectedValue]);
    } else if (keyword_btn.className === "") {
      setSelect(select.filter((key) => key !== selected));
      setSelectValue(selectValue.filter((key) => key !== selectedValue));
    }
  };

  function draw_line(event) {
    const childLine = event.target.childNodes;
    if (childLine.length !== 0) {
      event.target.innerHTML = "";
    } else if (childLine.length === 0) {
      let x = event.target.offsetLeft;
      let y = event.target.offsetTop;

      let targetX = selectedKey.current[5].offsetLeft;
      let targetY = selectedKey.current[5].offsetTop;

      let resultX = targetX - x;
      let resultY = targetY - y;

      const result = Math.sqrt(Math.pow(resultX, 2) + Math.pow(resultY, 2));

      const radian = Math.atan(resultX / resultY);
      let degree;
      if (resultX < 0 || resultY < 0) {
        degree = 270 - 57 * radian;
      } else if (resultX >= 0 && resultY >= 0) {
        degree = 90 - 57 * radian;
      }

      let line = document.createElement("div");
      line.classList.add("star_line");
      line.style.borderColor = "aliceblue";
      line.style.width = `${result}px`;
      line.style.transform = `translate(50px, 50px) rotate(${degree}deg)`;
      event.target.append(line);
    }
  }

  useEffect(() => {
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

  const navToggle = () => {
    nav_toggle.current.classList.toggle("active");
    console.dir(nav_toggle.current.className);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="container">
      <div ref={nav_toggle} className="nav active">
        {/* <h1>검색하기</h1> */}
        <form className="search_form" onSubmit={onSubmit}>
          <input type="text" placeholder="사건의 지평선" />
          <button>검색</button>
        </form>
        <div className="keyword_search">
          <div className="keyword">
            <ul>
              <li data-filter="first">
                <span onClick={onClick}>1집</span>
              </li>
              <li data-filter="second">
                <span onClick={onClick}>2집</span>
              </li>
              <li data-filter="third">
                <span onClick={onClick}>3집</span>
              </li>
              <li data-filter="fourth">
                <span onClick={onClick}>4집</span>
              </li>
              <li data-filter="space">
                <span onClick={onClick}>우주</span>
              </li>
              <li data-filter="fall">
                <span onClick={onClick}>가을</span>
              </li>
              <li data-filter="winter">
                <span onClick={onClick}>겨울</span>
              </li>
              <li data-filter="rock">
                <span onClick={onClick}>락</span>
              </li>
              <li data-filter="ballad">
                <span onClick={onClick}>발라드</span>
              </li>
              <li data-filter="jazz">
                <span onClick={onClick}>재즈</span>
              </li>
            </ul>
          </div>
          {/* <div className="selected">
            {select.map((key, index) => (
              <span key={index}>{key}</span>
            ))}
          </div>
          <h2>선택된 키워드</h2> */}
        </div>
        <div className="search">
          <span className="search_title">사건의 지평선</span>
          <div className="search_img">
            {/* <iframe
              width="200"
              height="200"
              src="https://www.youtube.com/embed/BBdC1rl5sKY"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe> */}
          </div>
          <ul className="search_keywords">
            <li>6집</li>
            <li>가을</li>
            <li>우주</li>
            <li>피아노</li>
          </ul>
          <button className="search_play_btn">▶</button>
        </div>
        <div className="nav_toggle active" onClick={navToggle}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
      <div className="star_filter">
        <div className="product">
          <div
            onClick={draw_line}
            id="star1"
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
            onClick={draw_line}
            id="star2"
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
            onClick={draw_line}
            ref={(item) => (selectedKey.current[2] = item)}
            className="itemBox"
            data-key1="first"
            data-key2="winter"
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
            data-key2="ballad"
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
            data-key1="fourth"
            data-key2="rock"
            data-key3="fall"
          >
            <div className="item_img"></div>
          </div>
          <div
            ref={(item) => (selectedKey.current[5] = item)}
            className="itemBox"
            data-key1="third"
            data-key2="jazz"
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
            onClick={draw_line}
            ref={(item) => (selectedKey.current[6] = item)}
            className="itemBox"
            data-key1="third"
            data-key2="rock"
            data-key3="winter"
          >
            <div className="item_img"></div>
            <div className="song_info">
              <span className="title">사건의 지평선</span>
              <div className="thumbnail"></div>
              <button className="song_play_btn">▶</button>
            </div>
          </div>
          <div
            ref={(item) => (selectedKey.current[7] = item)}
            className="itemBox"
            data-key1="fourth"
            data-key2="space"
            data-key3="jazz"
          >
            <div className="item_img"></div>
            <div className="song_info">
              <span className="title">사건의 지평선</span>
              <div className="thumbnail"></div>
              <button className="song_play_btn">▶</button>
            </div>
          </div>
          <div
            ref={(item) => (selectedKey.current[8] = item)}
            className="itemBox"
            data-key1="fourth"
            data-key2="ballad"
            data-key3="winter"
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
