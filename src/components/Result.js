import react, { memo } from "react";

const Result = (prop) => {
  return (
    <div className="result_list">
      <ul>
        {prop.list
          ? prop.list.map((item, index) => (
              <li
                data-title={item.song_title}
                onClick={prop.onClick}
                key={index}
              >
                {item.song_title}
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default memo(Result);
