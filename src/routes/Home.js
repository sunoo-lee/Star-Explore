// eslint-disable
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Star from "../components/Star";
import Navigation from "../components/Navigation";
import { ReactComponent as MobileBtn } from "../asset/모바일버튼_+.svg";

const Home = () => {
  const [select, setSelect] = useState([]);
  const [select_btn, setSelect_btn] = useState([]);
  const [select_att, setSelect_att] = useState([]);

  const star_ref = useRef([]);

  const [playerTag, setPlayerTag] = useState({
    key1: "#1",
    key2: "#2",
    key3: "#3",
    key4: "#4",
    key5: "#5",
    key6: "#6",
    key7: "#7",
    title: "title",
  });

  const keyword_list_1 = [
    { data: "따뜻한", keyword: "emotion1" },
    { data: "시니컬한", keyword: "emotion1" },
    { data: "시원한", keyword: "emotion1" },
    { data: "그리운", keyword: "emotion2" },
    { data: "나른한", keyword: "emotion2" },
    { data: "벅차는", keyword: "emotion2" },
    { data: "설레는", keyword: "emotion2" },
    { data: "아련한", keyword: "emotion2" },
    { data: "지겨운", keyword: "emotion2" },
    { data: "흥겨운", keyword: "emotion2" },
    { data: "간절한", keyword: "emotion3" },
    { data: "담담한", keyword: "emotion3" },
    { data: "신비로운", keyword: "emotion3" },
    { data: "애절한", keyword: "emotion3" },
    { data: "청량한", keyword: "emotion3" },
  ];
  const keyword_list_2 = [
    { data: "꿈", keyword: "theme1" },
    { data: "사랑", keyword: "theme1" },
    { data: "연주곡", keyword: "theme1" },
    { data: "이별", keyword: "theme1" },
    { data: "일상", keyword: "theme1" },
    { data: "짝사랑", keyword: "theme1" },
    { data: "비", keyword: "theme2" },
    { data: "성장", keyword: "theme2" },
    { data: "우주", keyword: "theme2" },
    { data: "추억", keyword: "theme2" },
    { data: "윤하", keyword: "theme3" },
    { data: "응원", keyword: "theme3" },
  ];
  const keyword_list_3 = [
    { data: "댄스", keyword: "genre" },
    { data: "J-POP", keyword: "genre" },
    { data: "OST", keyword: "genre" },
    { data: "POP", keyword: "genre" },
    { data: "R&B", keyword: "genre" },
    { data: "랩/힙합", keyword: "genre" },
    { data: "Rock", keyword: "genre" },
    { data: "발라드", keyword: "genre" },
  ];

  const star_data = [
    {
      title: "사건의 지평선",
      key1: "시원한",
      key2: "우주",
      key3: "",
      key4: "꿈",
      key5: "",
      key6: "",
      key7: "Rock",
      x: 124,
      y: 1743,
    },
    {
      title: "오르트구름",
      key1: "설레는",
      key2: "우주",
      key3: "",
      key4: "",
      key5: "꿈",
      key6: "응원",
      key7: "",
      x: 207,
      y: 492,
    },
    {
      title: "살별",
      key1: "아련한",
      key2: "연주곡",
      key3: "",
      key4: "",
      key5: "발라드",
      key6: "",
      key7: "비",
      x: 209,
      y: 975,
    },
    {
      title: "물의 여행",
      key1: "일상",
      key2: "",
      key3: "청량한",
      key4: "",
      key5: "Rock",
      key6: "",
      key7: "",
      x: 387,
      y: 1905,
    },
    {
      title: "반짝, 빛을 내",
      key1: "짝사랑",
      key2: "간절한",
      key3: "",
      key4: "신비로운",
      key5: "",
      key6: "발라드",
      key7: "",
      x: 508,
      y: 417,
    },
    {
      title: "6년 230일",
      key1: "응원",
      key2: "",
      key3: "신비로운",
      key4: "청량한",
      key5: "",
      key6: "",
      key7: "OST",
      x: 533,
      y: 1488,
    },
    {
      title: "P.R.R.W",
      key1: "우주",
      key2: "설레는",
      key3: "아련한",
      key4: "",
      key5: "청량한",
      key6: "",
      key7: "Rock",
      x: 545,
      y: 1384,
    },
    {
      title: "AQUALOVERS 〜DEEP into the night〜",
      key1: "시원한",
      key2: "청량한",
      key3: "설레는",
      key4: "추억",
      key5: "흥겨운",
      key6: "",
      key7: "Rock",
      x: 603,
      y: 1042,
    },
    {
      title: "Truly",
      key1: "흥겨운",
      key2: "추억",
      key3: "꿈",
      x: 874,
      y: 392,
    },
    {
      title: "별의 조각",
      key1: "우주",
      key2: "지겨운",
      key3: "나른한",
      x: 949,
      y: 838,
    },
    {
      title: "하나의 달",
      key1: "우주",
      key2: "담담한",
      key3: "짝사랑",
      x: 1108,
      y: 1105,
    },
    {
      title: "사건의 지평선",
      key1: "우주",
      key2: "설레는",
      key3: "청량한",
      x: 1116,
      y: 467,
    },
  ];

  const [keyState, setKeyState] = useState(false);

  const onKeyClick = (event) => {
    const keyword_btn = event.target;
    const btn_keyword = event.target.innerText;
    const btn_value = keyword_btn.parentElement.dataset.filter;
    const btn_att = keyword_btn.parentElement.dataset;
    // select_btn - 선택한 키워드 버튼
    // btn_keyword - 선택한 키워드 텍스트
    // btn_value - 선택한 키워드 값

    // 최대 6개 선택
    if (select_btn.length === 6) {
      if (keyword_btn.className === "btn on") {
        keyword_btn.classList.toggle("on");
        setSelect(select.filter((key) => key !== btn_keyword));
        setSelect_btn(select_btn.filter((key) => key !== btn_value));
        setSelect_att(select_att.filter((key) => key !== btn_att));
        return;
      }
    } else if (select_btn.length < 6) {
      keyword_btn.classList.toggle("on");
      if (keyword_btn.className === "btn on") {
        setKeyState(true);
        setSelect([...select, btn_keyword]);
        setSelect_btn([...select_btn, btn_value]);
        setSelect_att([...select_att, btn_att]);
      } else if (keyword_btn.className === "btn") {
        setSelect(select.filter((key) => key !== btn_keyword));
        setSelect_btn(select_btn.filter((key) => key !== btn_value));
        setSelect_att(select_att.filter((key) => key !== btn_att));
      }
    }
  };

  const onResetKey = () => {
    setSelect_btn([]);
    setSelect_att([]);
    setKeyState(false);
  };

  useEffect(() => {
    if (select_btn.length === 0) {
      setKeyState(false);
    }
  }, [select_btn]);

  const [resultCount, setResultCount] = useState(star_data.length);
  const [resultStars, setResultStar] = useState([]);

  useEffect(() => {
    let count = resultCount;
    for (let i = 0; i < star_ref.current.length; ++i) {
      const keyValues = Object.values(star_ref.current[i].dataset);
      const intersection = select_btn.filter((item) =>
        keyValues.includes(item)
      );

      if (select_btn.length !== intersection.length) {
        star_ref.current[i].classList.add("hide");
        count = count - 1;
      } else if (select_btn.length === intersection.length) {
        star_ref.current[i].classList.remove("hide");
      }
    }

    let filted_count = star_ref.current
      .filter((item) => item.className === "itemBox")
      .map((item) => item.childNodes[1].childNodes[0].innerHTML);

    setResultStar(filted_count);

    if (count < 0) count = 0;
    setResultCount(count);

    if (select_btn.length > 0 && resultCount > 0) {
      resize.current.classList.add("toggle");
    } else if (select_btn.length === 0) {
      resize.current.classList.remove("toggle");
      setResultCount(star_data.length);
    }
    // eslint-disable-next-line
  }, [select_btn]);

  useEffect(() => {
    if (resultStars.length > 0 && resultStars.length !== star_graphic.length) {
      result.current.classList.add("active");
    } else if (
      resultStars.length === 0 ||
      resultStars.length === star_graphic.length
    ) {
      result.current.classList.remove("active");
    }
    // eslint-disable-next-line
  }, [resultStars]);

  const resize = useRef();
  const result = useRef();

  const [star_graphic, setStar_graphic] = useState([]);
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    setStar_graphic(star_data);
    setResultStar(star_data);

    axios
      .get("http://localhost:8080/graphics")
      .then((response) => setStar_graphic(response.data));
    axios
      .get("http://localhost:8080/keywords")
      .then((response) => setKeywords(response.data));
    console.log("data load done");
    // eslint-disable-next-line
  }, []);

  const [result_list, setResult_list] = useState([]);

  const load_result_list = () => {
    const target_arr = select_att.map((item) => `${item.att}=${item.filter}`);
    const target = target_arr.join("&");
    axios
      .get(`http://localhost:8080/keywords/list?${target}`)
      .then((response) => setResult_list(response.data));
  };

  useEffect(() => {
    load_result_list();
    // eslint-disable-next-line
  }, [select_att]);

  const [albumInfo, setAlbumInfo] = useState();

  const select_result = (event) => {
    // 임시 데이터 가공 코드
    const target = event.target.innerText;
    const target_star = keywords.find(
      (element) => element.song_title === target
    );
    setPlayerTag(Object.values(target_star).filter((item) => item !== ""));
    axios
      .get(`http://localhost:8080/information/search=${target}`)
      .then((response) => setAlbumInfo(response.data));
    setToggle_state(2);
  };

  const nav_toggle = useRef([]);
  const song_keyword = useRef();
  const [toggle_state, setToggle_state] = useState(true);

  const onNavToggle = (event) => {
    nav_toggle.current[1].classList.toggle("active");
    if (toggle_state) {
      nav_toggle.current[0].childNodes[0].classList.toggle("m-toggle");
    } else if (!toggle_state) {
      nav_toggle.current[3].classList.toggle("active");
      setToggle_state(!toggle_state);
    }
  };
  const onPlayerToggle = () => {
    setToggle_state(false);
    nav_toggle.current[1].classList.toggle("active");
    nav_toggle.current[3].classList.toggle("active");
  };

  const space_toggle = () => {
    setToggle_state(!toggle_state);
  };

  return (
    <>
      <button onClick={space_toggle} className="anim_test">
        TOGGLE
      </button>
      {/* <button onClick={onResetKey} className="anim_test test2">
        {toggle_state}
      </button> */}
      <div
        ref={(item) => (nav_toggle.current[0] = item)}
        className="nav_container"
      >
        <Navigation
          keyword_list_1={keyword_list_1}
          keyword_list_2={keyword_list_2}
          keyword_list_3={keyword_list_3}
          onClick={onKeyClick}
          onResetKey={onResetKey}
          onClickResult={select_result}
          playerTag={playerTag}
          keyState={keyState}
        />
      </div>
      <div className="select_key">
        <ul>
          {select_btn.map((item, index) => (
            <li key={index}>
              <span className="btn on">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="result_container">
        <div ref={result} className="result_box">
          <div className="result_header">
            result:{" "}
            {result_list
              ? String(result_list.length).padStart(3, "0")
              : String(resultStars.length).padStart(3, "0")}
          </div>
          <div className="result_list">
            <ul>
              {result_list
                ? result_list.map((item, index) => (
                    <li
                      data-title={item.song_title}
                      onClick={select_result}
                      key={index}
                    >
                      {item.song_title}
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </div>
      </div>
      <div
        ref={(item) => (nav_toggle.current[3] = item)}
        className="player_container"
      >
        <div className="player_box">
          <div className="thumbnail">
            {/* {albumInfo ? (
              <iframe
                width="320"
                height="180"
                src={`https://www.youtube.com/embed/${albumInfo[0].embedcode}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            ) : (
              ""
            )} */}
          </div>
          <div className="song_data">
            <div className="song_title">
              {playerTag[0] ? playerTag[0] : "-"}
            </div>
            <div className="song_detail">
              {albumInfo ? (
                albumInfo[0].recommend !== 0 ? (
                  <>
                    <span>{albumInfo[0].album_title}</span>
                    <br />
                    <span>{albumInfo[0].release_date}</span>
                    <span className="like">♥ {albumInfo[0].recommend}명</span>
                  </>
                ) : (
                  <>
                    <span>{albumInfo[0].album_title}</span>
                    <br />
                    <span>{albumInfo[0].release_date}</span>
                  </>
                )
              ) : (
                <span>
                  song title
                  <br />
                  song.da.te | ♥ 0명
                </span>
              )}
            </div>
            <ul ref={song_keyword} className="keyword_list">
              <li>
                <span className="btn">{playerTag[1] ? playerTag[1] : "-"}</span>
              </li>
              <li>
                <span className="btn">{playerTag[2] ? playerTag[2] : "-"}</span>
              </li>
              <li>
                <span className="btn">{playerTag[3] ? playerTag[3] : "-"}</span>
              </li>
              <li>
                <span className="btn">{playerTag[4] ? playerTag[4] : "-"}</span>
              </li>
              <li>
                <span className="btn">{playerTag[5] ? playerTag[5] : "-"}</span>
              </li>
              <li>
                <span className="btn">{playerTag[6] ? playerTag[6] : "-"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="star_filter">
          <div ref={resize} className="product">
            <div className="center_star"></div>
            {keywords.length !== 0
              ? star_graphic.map((star, index) => (
                  <Star
                    ref={(item) => (star_ref.current[index] = item)}
                    key={index}
                    title={star.song_title}
                    x={star.x}
                    y={star.y}
                    key1={keywords[index].emotion1}
                    key2={keywords[index].emotion2}
                    key3={keywords[index].emotion3}
                    key4={keywords[index].genre}
                    key5={keywords[index].theme1}
                    key6={keywords[index].theme2}
                    key7={keywords[index].theme3}
                  />
                ))
              : star_graphic.map((star, index) => (
                  <Star
                    ref={(item) => (star_ref.current[index] = item)}
                    key={index}
                    title={star.title}
                    x={star.x}
                    y={star.y}
                    key1={star.key1}
                    key2={star.key2}
                    key3={star.key3}
                    key4={star.key4}
                    key5={star.key5}
                    key6={star.key6}
                    key7={star.key7}
                  />
                ))}
          </div>
        </div>
      </div>
      <div
        ref={(item) => (nav_toggle.current[2] = item)}
        onClick={onPlayerToggle}
        className="more_info"
      >
        <span className="btn">more info?</span>
      </div>
      <div
        ref={(item) => (nav_toggle.current[1] = item)}
        onClick={onNavToggle}
        className="mobile_toggle_btn"
      >
        <MobileBtn />
      </div>
    </>
  );
};

export default Home;
