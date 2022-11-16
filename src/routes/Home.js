import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
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

  const keyword_list_1 = [
    { data: "시원한", keyword: "시원한" },
    { data: "따뜻한", keyword: "따뜻한" },
    { data: "시니컬한", keyword: "시니컬한" },
    { data: "흥겨운", keyword: "흥겨운" },
    { data: "설레는", keyword: "설레는" },
    { data: "그리운", keyword: "그리운" },
    { data: "벅차는", keyword: "벅차는" },
    { data: "지겨운", keyword: "지겨운" },
    { data: "나른한", keyword: "나른한" },
    { data: "애절한", keyword: "애절한" },
    { data: "담담한", keyword: "담담한" },
    { data: "신비로운", keyword: "신비로운" },
    { data: "청량한", keyword: "청량한" },
    { data: "간절한", keyword: "간절한" },
  ];
  const keyword_list_2 = [
    { data: "연애/썸", keyword: "연애/썸" },
    { data: "일상", keyword: "일상" },
    { data: "꿈/성장", keyword: "꿈/성장" },
    { data: "이별", keyword: "이별" },
    { data: "짝사랑", keyword: "짝사랑" },
    { data: "응원", keyword: "응원" },
    { data: "비", keyword: "비" },
    { data: "우주", keyword: "우주" },
    { data: "추억", keyword: "추억" },
    { data: "우정과사랑사이", keyword: "우정과사랑사이" },
  ];
  const keyword_list_3 = [
    { data: "J-POP", keyword: "J-POP" },
    { data: "Rock", keyword: "Rock" },
    { data: "발라드", keyword: "발라드" },
    { data: "랩/힙합", keyword: "랩/힙합" },
    { data: "댄스", keyword: "댄스" },
    { data: "OST", keyword: "OST" },
    { data: "R&B/Soul", keyword: "R&B/Soul" },
  ];

  const star_data = [
    {
      title: "사건의 지평선",
      key1: "시원한",
      key2: "우주",
      x: 450,
      y: 550,
    },
    {
      title: "오르트구름",
      key1: "시원한",
      key2: "우주",
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
      key1: "시원한",
      key2: "청량한",
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
    const selected = event.target.innerText;
    const selectedValue = keyword_btn.parentElement.dataset.filter;

    if (selectValue.length === 6) {
      if (keyword_btn.className === "btn on") {
        keyword_btn.classList.toggle("on");
        setSelect(select.filter((key) => key !== selected));
        setSelectValue(selectValue.filter((key) => key !== selectedValue));
        return;
      }
    } else if (selectValue.length < 6) {
      keyword_btn.classList.toggle("on");
      if (keyword_btn.className === "btn on") {
        setSelect([...select, selected]);
        setSelectValue([...selectValue, selectedValue]);
      } else if (keyword_btn.className === "btn") {
        setSelect(select.filter((key) => key !== selected));
        setSelectValue(selectValue.filter((key) => key !== selectedValue));
      }
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
  const result = useRef();

  const [testdata, setTestdata] = useState("");

  const sendRequest = async () => {
    result.current.classList.toggle("active");
    axios
      .get("http://localhost:8080/songInformation/사")
      .then((response) => setTestdata(response.data));
  };

  useEffect(() => {
    console.log(typeof testdata);
  }, [testdata]);

  const toggleBtn = useRef();

  const navToggle = () => {
    toggleBtn.current.classList.toggle("active");
    nav_toggle.current.classList.toggle("active");
    document.body.classList.toggle("stop-scroll", nav);
    setNav(!nav);
  };

  return (
    <>
      <button onClick={sendRequest} className="anim_test">
        test
      </button>
      <Navigation
        onSubmit={onSubmit}
        keyword_list_1={keyword_list_1}
        keyword_list_2={keyword_list_2}
        keyword_list_3={keyword_list_3}
        onClick={onClick}
        playerTag={playerTag}
      />
      <div className="select_key">
        <ul>
          {selectValue.map((item, index) => (
            <li key={index}>
              <span className="btn on">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="result_container">
        <div ref={result} className="result_box">
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
      </div>
      <div className="player_container">
        <div className="player_box">
          <div className="thumbnail">
            <iframe
              width="320"
              height="180"
              src="https://www.youtube.com/embed/BBdC1rl5sKY?rel=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div className="song_data">
            <div className="song_title">사건의 지평선</div>
            <div className="song_detail">
              One More Time, One More Track \ 락 \ 2022.01.30 \ ♥ 52명
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
      </div>
      <div className="container">
        <div className="star_filter">
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
