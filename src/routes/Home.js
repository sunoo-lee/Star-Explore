import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlay,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Star from "../components/Star";

const Home = () => {
  const [select, setSelect] = useState([]);
  const [selectValue, setSelectValue] = useState([]);

  const selectedKey = useRef([]);
  let nav_toggle = useRef();
  const [nav, setNav] = useState(false);

  const [data, setData] = useState([]);
  const [playerTag, setPlayerTag] = useState([
    "Select Music",
    "#1",
    "#2",
    "#3",
    "#4",
  ]);

  const keyword_list = [
    { data: "first", keyword: "1집" },
    { data: "second", keyword: "2집" },
    { data: "third", keyword: "3집" },
    { data: "fourth", keyword: "4집" },
    { data: "space", keyword: "우주" },
    { data: "fall", keyword: "가을" },
    { data: "winter", keyword: "겨울" },
    { data: "rock", keyword: "락" },
    { data: "ballad", keyword: "발라드" },
    { data: "jazz", keyword: "재즈" },
  ];

  const star_data = [
    {
      title: "오르트구름",
      key1: "first",
      key2: "fall",
    },
    {
      title: "살별",
      key1: "second",
      key2: "rock",
    },
    {
      title: "물의 여행",
      key1: "third",
      key2: "winter",
    },
    {
      title: "반짝, 빛을 내",
      key1: "fourth",
      key2: "space",
    },
    {
      title: "6년 230일",
      key1: "first",
      key2: "ballad",
    },
    {
      title: "P.R.R.W",
      key1: "second",
      key2: "jazz",
      key3: "winter",
    },
    {
      title: "나는 계획이 있다",
      key1: "first",
      key2: "rock",
      key3: "winter",
    },
    {
      title: "Truly",
      key1: "second",
      key2: "ballad",
      key3: "fall",
    },
    {
      title: "별의 조각",
      key1: "fourth",
      key2: "jazz",
      key3: "winter",
    },
    {
      title: "하나의 달",
      key1: "third",
      key2: "rock",
      key3: "fall",
    },
    {
      title: "사건의 지평선",
      key1: "second",
      key2: "space",
      key3: "winter",
    },
  ];

  const onClick = (event) => {
    const keyword_btn = event.target;
    keyword_btn.classList.toggle("on");

    const selected = event.target.innerText;
    const selectedValue = keyword_btn.parentElement.dataset.filter;

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
      line.style.transform = `translate(10px, 10px) rotate(${degree}deg)`;
      event.target.append(line);
    }
  }
  useEffect(() => {
    setData(star_data);
  }, []);

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

  const onSubmit = (event) => {
    event.preventDefault();
  };
  const resize = useRef();
  const onAnimTest = () => {
    resize.current.classList.toggle("toggle");
  };
  // const zoomScroll = () => {
  //   const zoomElement = document.querySelector(".star_filter");
  //   let zoom = 1;
  //   const ZOOM_SPEED = 0.1;

  //   document.addEventListener("wheel", function (e) {
  //     if (e.deltaY > 0) {
  //       zoomElement.style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
  //     } else {
  //       zoomElement.style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
  //     }
  //   });
  // };

  const playerChange = (event) => {
    const player_title =
      event.target.parentNode.childNodes[1].childNodes[0].innerHTML;
    const tags = Object.values(event.target.parentNode.dataset);
    setPlayerTag([player_title, ...tags]);
  };

  const navToggle = () => {
    nav_toggle.current.classList.toggle("active");
    setNav(!nav);
  };

  return (
    <div className="container">
      <div ref={nav_toggle} className="nav active">
        <form className="search_form" onSubmit={onSubmit}>
          <input type="text" placeholder="사건의 지평선" />
          <button>검색</button>
        </form>
        <div className="keyword_search">
          <div className="keyword">
            <ul>
              {keyword_list.map((item, index) => (
                <li data-filter={item.data} key={index}>
                  <span onClick={onClick}>{item.keyword}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="search">
          <span className="search_title">{playerTag[0]}</span>
          <div className="search_img"></div>
          <ul className="search_keywords">
            <li>{playerTag[1]}</li>
            <li>{playerTag[2]}</li>
            <li>{playerTag[3]}</li>
            <li>{playerTag[4]}</li>
          </ul>
          <button className="search_play_btn">
            <FontAwesomeIcon icon={faPlay} />
          </button>
        </div>
        <div className="nav_toggle active" onClick={navToggle}>
          {nav ? (
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          ) : (
            <FontAwesomeIcon icon={faXmark} />
          )}
        </div>
      </div>
      <div className="star_filter">
        <button onClick={onAnimTest} className="anim_test">
          toggle
        </button>
        <div ref={resize} className="product">
          {data.map((star, index) => (
            <Star
              ref={(item) => (selectedKey.current[index] = item)}
              key={index}
              key1={star.key1}
              key2={star.key2}
              key3={star.key3}
              title={star.title}
              onClick={playerChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
