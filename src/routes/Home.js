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
                // onClick={playerChange}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
