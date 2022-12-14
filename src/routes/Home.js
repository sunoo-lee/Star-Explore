// eslint-disable
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import Star from "../components/Star";
import Navigation from "../components/Navigation";
import { ReactComponent as MobileBtn } from "../asset/mobile_btn.svg";
import Info from "../components/Info";
import Intro from "../components/Intro";
import Result from "../components/Result";

const Home = () => {
  const [select, setSelect] = useState([]);
  const [select_btn, setSelect_btn] = useState([]);
  const [select_att, setSelect_att] = useState([]);

  const star_ref = useRef([]);
  const info_ref = useRef([]);

  const [playerTag, setPlayerTag] = useState([
    "#0",
    "#1",
    "#2",
    "#3",
    "#4",
    "#5",
    "#6",
  ]);

  const [playerKey, setPlayerKey] = useState([
    { data: "따뜻한", keyword: "emotion1" },
    { data: "따뜻한", keyword: "emotion1" },
    { data: "시니컬한", keyword: "emotion1" },
    { data: "시원한", keyword: "emotion1" },
    { data: "그리운", keyword: "emotion2" },
    { data: "나른한", keyword: "emotion2" },
    { data: "벅차는", keyword: "emotion2" },
  ]);

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
    { data: "RnB", keyword: "genre" },
    { data: "랩/힙합", keyword: "genre" },
    { data: "Rock", keyword: "genre" },
    { data: "발라드", keyword: "genre" },
  ];

  const [resultCount, setResultCount] = useState(272);
  const [resultStars, setResultStar] = useState([]);

  const [star_graphic, setStar_graphic] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const [result_list, setResult_list] = useState([]);

  const [keyState, setKeyState] = useState(false);
  const [albumInfo, setAlbumInfo] = useState([
    { song_title: "노래를 선택해주세요.", album_title: "노래를 선택해주세요." },
  ]);
  const [toggle_state, setToggle_state] = useState(true);
  const [playerState, setPlayerState] = useState(false);

  const [spacePosition, setSpacePosition] = useState([]);

  const [spaceOffset, setSpaceOffset] = useState([]);

  const resize = useRef();

  const result = useRef();

  const nav_toggle = useRef([]);

  const song_keyword = useRef();

  const song_title_ref = useRef("");

  const onKeyClick = (event) => {
    reset_info_toggle();
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
        setSelect_att(
          select_att.filter((key) => key.filter !== btn_att.filter)
        );
      }
    }

    if (playerState) {
      for (let i = 0; i < 6; ++i) {
        if (
          song_keyword.current.childNodes[i].childNodes[0].innerText ===
            btn_keyword &&
          keyword_btn.className === "btn on"
        ) {
          song_keyword.current.childNodes[i].childNodes[0].classList.add("on");
        } else if (
          song_keyword.current.childNodes[i].childNodes[0].innerText ===
            btn_keyword &&
          keyword_btn.className === "btn"
        ) {
          song_keyword.current.childNodes[i].childNodes[0].classList.remove(
            "on"
          );
        }
      }
    } else {
      return;
    }
  };

  const toggleResultListOn = () => {
    const target = result.current.childNodes[1].childNodes[0];
    const target_title = albumInfo[albumInfo.length - 1].song_title;
    for (let i = 0; i < target.childNodes.length; ++i) {
      if (target.childNodes[i].textContent === target_title) {
        target.childNodes[i].classList.add("on");
      } else {
        target.childNodes[i].classList.remove("on");
      }
    }
  };

  const onResetKey = useCallback(() => {
    setKeyState(false);
    reset_info_toggle();
    for (let i = 0; i < result_list.length; ++i) {
      result.current.childNodes[1].childNodes[0].childNodes[i].classList.remove(
        "on"
      );
    }
    for (let i = 0; i < song_keyword.current.childNodes.length; ++i) {
      const target = song_keyword.current.childNodes[i].childNodes[0];
      target.classList.remove("on");
    }
    setSelect_btn([]);
    setSelect_att([]);
    setSelect([]);
  }, [result_list]);

  const onResetPos = () => {
    onResetKey();
    setPlayerState(false);
    setTimeout(setSpacePosition, 500, []);
  };

  const load_result_list = () => {
    const target_arr = select_att.map((item) => `${item.att}=${item.filter}`);
    const target = target_arr.join("&");
    axios
      .get(`https://c-2022yh.space/keywords/list?${target}`)
      .then((response) => setResult_list(response.data));
  };

  const navKeyControl = () => {
    const target_path =
      nav_toggle.current[0].childNodes[0].childNodes[1].childNodes[1];
    const key_1 = target_path.childNodes[0].children[1].childNodes;
    const key_2 = target_path.childNodes[1].children[1].childNodes;
    const key_3 = target_path.childNodes[2].children[1].childNodes;

    for (let i = 0; i < key_1.length; ++i) {
      if (select.find((item) => item === key_1[i].dataset.filter)) {
        key_1[i].childNodes[0].classList.add("on");
      } else {
        key_1[i].childNodes[0].classList.remove("on");
      }
    }
    for (let i = 0; i < key_2.length; ++i) {
      if (select.find((item) => item === key_2[i].dataset.filter)) {
        key_2[i].childNodes[0].classList.add("on");
      } else {
        key_2[i].childNodes[0].classList.remove("on");
      }
    }
    for (let i = 0; i < key_3.length; ++i) {
      if (select.find((item) => item === key_3[i].dataset.filter)) {
        key_3[i].childNodes[0].classList.add("on");
      } else {
        key_3[i].childNodes[0].classList.remove("on");
      }
    }
  };

  const onPlayerKeyClick = (event) => {
    const keyword_btn = event.target;
    const target_data = keyword_btn.innerText;

    if (target_data === "-") {
      return;
    }

    const target_att = keyword_btn.parentNode.dataset;
    const target_value = keyword_btn.parentNode.dataset.filter;

    if (select_btn.length === 6) {
      if (keyword_btn.className === "btn on") {
        keyword_btn.classList.remove("on");
        setSelect(select.filter((key) => key !== target_value));
        setSelect_btn(select_btn.filter((key) => key !== target_value));
        setSelect_att(
          select_att.filter((key) => key.filter !== target_att.filter)
        );
        return;
      }
    } else if (select_btn.length < 6) {
      if (keyword_btn.className === "btn") {
        setKeyState(true);
        keyword_btn.classList.add("on");
        setSelect([...select, target_data]);
        setSelect_btn([...select_btn, target_value]);
        setSelect_att([...select_att, target_att]);
      } else if (keyword_btn.className === "btn on") {
        keyword_btn.classList.remove("on");
        setSelect(select.filter((key) => key !== target_value));
        setSelect_btn(select_btn.filter((key) => key !== target_value));
        setSelect_att(
          select_att.filter((key) => key.filter !== target_att.filter)
        );
        return;
      }
    }
  };

  const delete_empty_key = () => {
    for (let i = 0; i < song_keyword.current.childNodes.length; ++i) {
      if (song_keyword.current.childNodes[i].dataset.att === "") {
        song_keyword.current.childNodes[i].style.display = "none";
      } else {
        song_keyword.current.childNodes[i].style.display = "block";
      }
    }
  };

  useEffect(() => {
    // delete_empty_key();
  }, [playerTag]);

  const select_result = (event) => {
    // 데이터 가공 코드

    const target = event.target.innerText;
    const target_star = keywords.find(
      (element) => element.song_title === target
    );
    const target_coordinate = star_graphic.find(
      (element) => element.song_title === target
    );

    const info_target = star_graphic.findIndex(
      (element) => element.song_title === target
    );

    const widthOffset = 1000 - target_coordinate.x;
    const heightOffset = 1000 - target_coordinate.y; // scale 1.0

    setSpacePosition({
      transform: `translate(${widthOffset}px, ${heightOffset}px)`,
    });

    const tag_array = Object.values(target_star);

    // for (let i = tag_array.length; i < 7; ++i) {
    //   tag_array.push("-");
    // }

    axios
      .get(`https://c-2022yh.space/select/title=${target}`)
      .then((response) => setAlbumInfo(response.data));

    if (toggle_state) {
      for (let i = 0; i < result_list.length; ++i) {
        event.target.parentNode.childNodes[i].classList.remove("on");
      }
    }
    reset_info_toggle();

    info_ref.current[info_target].classList.add("active"); //song info
    event.target.classList.add("on");
    setPlayerTag(tag_array.filter((item) => item !== null));
    onSetPlayerTagData();
    setPlayerState(true);
  };

  const keyword_combine = useMemo(() => {
    return [...keyword_list_1, ...keyword_list_2, ...keyword_list_3];
    // eslint-disable-next-line
  }, []);

  const onSetPlayerTagData = () => {
    const keyword_btn = playerTag.map((item) =>
      keyword_combine.find((target) => target.data === item)
    );
    keyword_btn.shift();
    setPlayerKey(keyword_btn);
  };

  const select_search_result = (event) => {
    const target = event.target.innerText;

    axios
      .get(`https://c-2022yh.space/select/title=${target}`)
      .then((response) => setAlbumInfo(response.data));

    const target_star = keywords.find(
      (element) => element.song_title === target
    );
    const target_coordinate = star_graphic.find(
      (element) => element.song_title === target
    );

    const info_target = star_graphic.findIndex(
      (element) => element.song_title === target
    );

    const widthOffset = 1000 - target_coordinate.x;
    const heightOffset = 1000 - target_coordinate.y;

    setTimeout(setSpacePosition, 300, {
      transform: `translate(${widthOffset}px, ${heightOffset}px)`,
    });

    const tag_array = Object.values(target_star)
      .filter((item) => item !== "")
      .filter((item) => item !== null);

    for (let i = tag_array.length; i < 7; ++i) {
      tag_array.push("-");
    }
    setPlayerTag(tag_array);

    reset_info_toggle();

    // setPlayerTag(Object.values(target_star).filter((item) => item !== ""));

    info_ref.current[info_target].classList.add("active"); //song info
    setPlayerState(true);
    nav_toggle.current[3].classList.remove("hide"); // song data
    onNavToggle();
  };

  const reset_info_toggle = () => {
    for (let i = 0; i < info_ref.current.length; ++i) {
      info_ref.current[i].classList.remove("active");
    }
  };

  const onNavToggle = () => {
    nav_toggle.current[1].classList.toggle("active"); // toggle btn
    if (toggle_state) {
      nav_toggle.current[0].classList.toggle("m-toggle"); // nav
      nav_toggle.current[4].resetValue();
    } else if (!toggle_state) {
      nav_toggle.current[3].classList.remove("active"); // player
      setToggle_state(true);
    }
  };

  const space_center = useCallback(() => {
    const w_width = document.body.offsetWidth;
    const w_height = document.body.offsetHeight;

    const space_x = (2500 - w_width) / 2 - 250;
    const space_y = (2000 - w_height) / 2;

    if (space_x < 0 && space_y < 0) {
      setSpaceOffset({
        transform: `translate(${space_x * -1}px, ${space_y * -1}px)`,
      });
    } else if (space_x >= 0 && space_y < 0) {
      setSpaceOffset({
        transform: `translate(${space_x * -1}px, ${space_y * -1}px)`,
      });
    } else if (space_x < 0 && space_y >= 0) {
      setSpaceOffset({
        transform: `translate(${space_x * -1}px, ${space_y * -1}px)`,
      });
    } else if (space_x >= 0 && space_y >= 0) {
      setSpaceOffset({
        transform: `translate(-${space_x}px, -${space_y}px)`,
      });
    }
    setSpacePosition([]);
    // eslint-disable-next-line
  }, [document.body.offsetWidth, document.body.offsetHeight]);

  const onMouseEnter = useCallback((event) => {
    let target;
    if (event.target.className === "item_img") {
      target = event.target.parentNode.dataset.title;
    } else {
      target = event.target.parentNode.parentNode.dataset.title;
    }
    const target_info = info_ref.current.find(
      (item) => item.textContent === target
    );
    target_info.classList.add("hide");
  }, []);

  const onMouseLeave = useCallback((event) => {
    let target;
    if (event.target.className === "item_img") {
      target = event.target.parentNode.dataset.title;
    } else {
      target = event.target.parentNode.parentNode.dataset.title;
    }
    const target_info = info_ref.current.find(
      (item) => item.textContent === target
    );
    target_info.classList.remove("hide");
  }, []);

  const playerBtnToggle = () => {
    nav_toggle.current[3].classList.toggle("minimize");
  };

  useEffect(() => {
    space_center();
    onSetPlayerTagData();
    // delete_empty_key();
    axios
      .get("https://c-2022yh.space/graphics")
      .then((response) => setStar_graphic(response.data));
    axios
      .get("https://c-2022yh.space/keywords")
      .then((response) => setKeywords(response.data));
    // console.log("data load done");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    space_center();
    // eslint-disable-next-line
  }, [document.body.offsetWidth, document.body.offsetHeight]);

  useEffect(() => {
    load_result_list();
    navKeyControl();
    // if (select_btn.length === 0) {
    //   setKeyState(false);
    //   setSelect_att([]);
    // }

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
      .map((item) => item.dataset.title);

    setResultStar(filted_count);

    if (count < 0) count = 0;
    setResultCount(count);

    if (select_btn.length > 0) {
      resize.current.childNodes[0].childNodes[0].classList.add("hide");
    } else if (select_btn.length === 0) {
      resize.current.childNodes[0].childNodes[0].classList.remove("hide");
      toggleResultListOn();
      setKeyState(false);
      setSelect_att([]);
      nav_toggle.current[3].classList.add("hide");
      setAlbumInfo([
        {
          song_title: "노래를 선택해주세요.",
          album_title: "노래를 선택해주세요.",
        },
      ]);
    }

    // eslint-disable-next-line
  }, [select]);

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

  useEffect(() => {
    toggleResultListOn();
    // eslint-disable-next-line
  }, [result_list]);

  useEffect(() => {
    for (let i = 0; i < song_keyword.current.childNodes.length; ++i) {
      const target = song_keyword.current.childNodes[i].childNodes[0];
      const target_list = select.find((item) => item === target.innerText);
      if (target_list) {
        target.classList.add("on");
      } else {
        target.classList.remove("on");
      }
    }
    delete_empty_key();
    // eslint-disable-next-line
  }, [playerKey]);

  useEffect(() => {
    onSetPlayerTagData();
    if (playerState) {
      nav_toggle.current[3].classList.remove("hide");
    } else {
      nav_toggle.current[3].classList.add("hide");
    }
    // eslint-disable-next-line
  }, [playerState, playerTag]);

  useEffect(() => {
    const target = song_title_ref.current.childNodes[0].childNodes[0];
    const width = document.body.offsetWidth;
    if (albumInfo) {
      const title_length = albumInfo[0].album_title.length;
      const mobile_length =
        target.parentNode.parentNode.parentNode.childNodes[0].childNodes[0]
          .length;
      const target_font = target.parentNode.parentNode.parentNode.childNodes[0];
      if (title_length > 30) {
        target.parentNode.style.fontSize = "12px";
      } else if (title_length <= 30) {
        target.parentNode.style.fontSize = "14px";
      }
      if (width < 820 && mobile_length > 9) {
        target_font.style.fontSize = `${(width * 0.6) / 11}px`;
        // target_font.style.lineHeight = `${(width * 0.6) / 11}px`;
      } else {
        target_font.style.fontSize = "";
        target_font.style.lineHeight = "";
      }
      if (playerTag[0].length > 15) {
        song_title_ref.current.parentNode.childNodes[0].style.fontSize = "18px";
      } else {
        song_title_ref.current.parentNode.childNodes[0].style.fontSize = "";
      }
    } else {
      return;
    }
    // eslint-disable-next-line
  }, [albumInfo]);

  const select_star = (event) => {
    // 데이터 가공 코드
    const target_item = event.target.parentNode;
    let target;
    if (target_item.className === "itemBox") {
      target = target_item.dataset.title;
    } else if (target_item.className === "item_img") {
      target = target_item.parentNode.dataset.title;
    }

    const target_star = keywords.find(
      (element) => element.song_title === target
    );
    const target_coordinate = star_graphic.find(
      (element) => element.song_title === target
    );

    const info_target = star_graphic.findIndex(
      (element) => element.song_title === target
    );

    const widthOffset = 1000 - target_coordinate.x;
    const heightOffset = 1000 - target_coordinate.y; // scale 1.0

    setSpacePosition({
      transform: `translate(${widthOffset}px, ${heightOffset}px)`,
    });

    const tag_array = Object.values(target_star)
      .filter((item) => item !== "")
      .filter((item) => item !== null);

    for (let i = tag_array.length; i < 7; ++i) {
      tag_array.push("-");
    }
    setPlayerTag(tag_array);
    axios
      .get(`https://c-2022yh.space/select/title=${target}`)
      .then((response) => setAlbumInfo(response.data));

    if (toggle_state && result.current.className === "result_box active") {
      for (let i = 0; i < result_list.length; ++i) {
        result.current.childNodes[1].childNodes[0].childNodes[
          i
        ].classList.remove("on");

        if (
          result.current.childNodes[1].childNodes[0].childNodes[i].dataset
            .title === target
        ) {
          result.current.childNodes[1].childNodes[0].childNodes[
            i
          ].classList.add("on");
        }
      }
    }
    reset_info_toggle();

    info_ref.current[info_target].classList.add("active"); //song info
    setPlayerState(true);
    nav_toggle.current[3].classList.remove("hide"); // song data
  };
  return (
    <>
      {/* <div className="anim_test btn" onClick={delete_empty_key}>
        test
      </div> */}
      <div
        ref={(item) => (nav_toggle.current[0] = item)}
        className="nav_container"
      >
        <Navigation
          ref={(item) => (nav_toggle.current[4] = item)}
          keyword_list_1={keyword_list_1}
          keyword_list_2={keyword_list_2}
          keyword_list_3={keyword_list_3}
          onClick={onKeyClick}
          onResetKey={onResetKey}
          onResetPos={onResetPos}
          onClickResult={select_search_result}
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
          <Result list={result_list} onClick={select_result} />
        </div>
      </div>
      <div
        ref={(item) => (nav_toggle.current[3] = item)}
        className="player_container hide"
      >
        <div className="player_box">
          <div className="thumbnail">
            {albumInfo ? (
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
            )}
          </div>
          <div className="song_data">
            <div className="song_title">
              {playerTag[0] ? playerTag[0] : "-"}
            </div>
            <div ref={song_title_ref} className="song_detail">
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
                  곡을 선택해주세요.
                  <br />
                  0000.00.00 | ♥ 0명
                </span>
              )}
            </div>
            <ul ref={song_keyword} className="keyword_list">
              {playerKey
                ? playerKey.map((item, index) => (
                    <li
                      key={index}
                      data-filter={item ? item.data : ""}
                      data-att={item ? item.keyword : ""}
                    >
                      <span onClick={onPlayerKeyClick} className="btn">
                        {playerTag[index + 1] ? playerTag[index + 1] : ""}
                      </span>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
          <div onClick={playerBtnToggle} className="player_toggle_btn"></div>
        </div>
      </div>

      <div className="container">
        <div ref={resize} className="space_wrap">
          <div style={spacePosition} className="star_filter">
            <div style={spaceOffset} className="taurus"></div>
            <div style={spaceOffset} className="product">
              {keywords.length !== 0
                ? star_graphic.map((star, index) => (
                    <Star
                      ref={(item) => (star_ref.current[index] = item)}
                      key={index}
                      title={star.song_title}
                      x={star.x}
                      y={star.y}
                      size={star.size}
                      key1={keywords[index].emotion1}
                      key2={keywords[index].emotion2}
                      key3={keywords[index].emotion3}
                      key4={keywords[index].genre}
                      key5={keywords[index].theme1}
                      key6={keywords[index].theme2}
                      key7={keywords[index].theme3}
                      mouseenter={onMouseEnter}
                      mouseleave={onMouseLeave}
                      onStarClick={select_star}
                    />
                  ))
                : ""}
            </div>
            <div style={spaceOffset} className="info_container">
              {star_graphic.length !== 0
                ? star_graphic.map((star, index) => (
                    <Info
                      ref={(item) => (info_ref.current[index] = item)}
                      key={index}
                      title={star.song_title}
                      size={star.size}
                      x={star.x}
                      y={star.y}
                    />
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
      <div
        ref={(item) => (nav_toggle.current[1] = item)}
        onClick={onNavToggle}
        className="mobile_toggle_btn"
      >
        <MobileBtn />
      </div>
      <Intro />
    </>
  );
};

export default Home;
