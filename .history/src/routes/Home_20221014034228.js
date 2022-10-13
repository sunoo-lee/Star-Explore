import React, { useState } from "react";

const Home = () => {
  const [select, setSelect] = useState([]);
  const onClick = (event) => {
    const keyword_btn = event.target;
    keyword_btn.className === "off"
      ? (keyword_btn.className = "on")
      : (keyword_btn.className = "off");
    console.log(keyword_btn);
  };
  return (
    <div>
      <h1>Home</h1>
      <div className="nav">
        <form>
          <div>검색</div>
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
        선택된 키워드
        {select}
      </div>
    </div>
  );
};

export default Home;
