import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const API = () => {
  const [data, setData] = useState("");
  const callApi = async () => {
    axios.get("/api").then((res) => setData(`{$res.data.result}`));
  };

  useEffect(() => {
    callApi();
  }, []);

  return <div>{data}</div>;
};

export default API;
