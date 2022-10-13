import React from "react";

const Home = () => {
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
              <span>키워드1</span>
              <span>키워드2</span>
              <span>키워드3</span>
              <span>키워드4</span>
              <span>키워드5</span>
              <span>키워드6</span>
              <span>키워드7</span>
              <span>키워드8</span>
              <span>키워드9</span>
              <span>키워드10</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
