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
      </div>
    </div>
  );
};

export default Home;
