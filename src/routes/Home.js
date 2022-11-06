import React, { useEffect, useRef, useState } from "react";
import Star from "../components/Star";
import Navigation from "../components/Navigation";

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
    { data: "first", keyword: "시원한" },
    { data: "second", keyword: "따뜻한" },
    { data: "third", keyword: "시니컬한" },
    { data: "fourth", keyword: "흥겨운" },
    { data: "space", keyword: "설레는" },
    { data: "fall", keyword: "그리운" },
    { data: "winter", keyword: "벅차는" },
    { data: "rock", keyword: "지겨운" },
    { data: "ballad", keyword: "나른한" },
    { data: "jazz", keyword: "애절한" },
    { data: "jazz", keyword: "담담한" },
    { data: "jazz", keyword: "신비로운" },
    { data: "jazz", keyword: "청량한" },
    { data: "jazz", keyword: "간절한" },
  ];

  const star_data = [
    {
      title: "사건의 지평선",
      key1: "first",
      key2: "fall",
      x: 450,
      y: 550,
    },
    {
      title: "오르트구름",
      key1: "first",
      key2: "fall",
      x: 540,
      y: 240,
    },
    // {
    //   title: "살별",
    //   key1: "second",
    //   key2: "rock",
    // },
    // {
    //   title: "물의 여행",
    //   key1: "third",
    //   key2: "winter",
    // },
    // {
    //   title: "반짝, 빛을 내",
    //   key1: "fourth",
    //   key2: "space",
    // },
    // {
    //   title: "6년 230일",
    //   key1: "first",
    //   key2: "ballad",
    // },
    // {
    //   title: "P.R.R.W",
    //   key1: "second",
    //   key2: "jazz",
    //   key3: "winter",
    // },
    {
      title: "AQUALOVERS 〜DEEP into the night〜",
      key1: "first",
      key2: "rock",
      key3: "winter",
      x: 880,
      y: 380,
    },
    // {
    //   title: "Truly",
    //   key1: "second",
    //   key2: "ballad",
    //   key3: "fall",
    // },
    // {
    //   title: "별의 조각",
    //   key1: "fourth",
    //   key2: "jazz",
    //   key3: "winter",
    // },
    // {
    //   title: "하나의 달",
    //   key1: "third",
    //   key2: "rock",
    //   key3: "fall",
    // },
    // {
    //   title: "사건의 지평선",
    //   key1: "second",
    //   key2: "space",
    //   key3: "winter",
    // },
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
    if (selectValue.length > 0) {
      resize.current.classList.add("toggle");
    } else if (selectValue.length === 0) {
      resize.current.classList.remove("toggle");
    }
  }, [selectValue]);

  const onSubmit = (event) => {
    event.preventDefault();
  };
  const resize = useRef();
  const onAnimTest = () => {
    resize.current.classList.toggle("toggle");
  };

  const toggleBtn = useRef();

  const navToggle = () => {
    toggleBtn.current.classList.toggle("active");
    nav_toggle.current.classList.toggle("active");
    document.body.classList.toggle("stop-scroll", nav);
    setNav(!nav);
  };

  return (
    <>
      <Navigation
        onSubmit={onSubmit}
        keyword_list={keyword_list}
        onClick={onClick}
        playerTag={playerTag}
      />
      <div className="select_key">
        <ul>
          <li>
            <span>시원한</span>
          </li>
          <li>
            <span>청량한</span>
          </li>
          <li>
            <span>우주</span>
          </li>
        </ul>
      </div>
      <div className="result_container">
        <div className="result_box">
          <div className="result_header">result: 000</div>
          <div className="result_list">
            <ul>
              <li>사건의 지평선</li>
              <li>혜성</li>
              <li>블랙홀</li>
              <li>물의 여행</li>
              <li>오르트구름</li>
              <li>하나의 달</li>
              <li>별의 조각</li>
              <li>사건의 지평선</li>
              <li>혜성</li>
              <li>블랙홀</li>
              <li>물의 여행</li>
              <li>오르트구름</li>
              <li>하나의 달</li>
              <li>별의 조각</li>
            </ul>
          </div>
        </div>
        <div className="player_box">
          <div className="play_btn"></div>
          <div className="thumbnail"></div>
          <div className="song_data">
            <div className="song_title">사건의 지평선</div>
            <div className="song_detail">
              ENDTHEORY / 락 / 2022.01.30 / ♥ 52명
            </div>
          </div>
          <ul className="keyword_list">
            <li>
              <span>시원한</span>
            </li>
            <li>
              <span>따뜻한</span>
            </li>
            <li>
              <span>우주</span>
            </li>
            <li>
              <span>청량한</span>
            </li>
            <li>
              <span>-</span>
            </li>
            <li>
              <span>-</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
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
                x={star.x}
                y={star.y}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
