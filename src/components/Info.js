import React, { memo, forwardRef } from "react";

const Info = forwardRef((prop, ref) => {
  const style = {
    left: `${prop.x}px`,
    top: `${prop.y}px`,
  };

  return (
    <div ref={ref} style={style} className={`song_info ${prop.size}`}>
      <span className="title">{prop.title}</span>
    </div>
  );
});

export default memo(Info);
