// const onPlayerKeyClick = (event) => {

// if (event.target.innerText === "-") {
//   return;
// }

// const keyword_btn = event.target;
// const target_data = keyword_btn.innerText;

// // let target_att = { filter: "", att: "" };
// // let target_value = "-";
// // if (target_data) {
// //   target_value = keyword_btn.parentNode.dataset.filter;
// //   target_att = keyword_btn.parentNode.dataset;
// // }
// const target_att = keyword_btn.parentNode.dataset;
// const target_value = keyword_btn.parentNode.dataset.filter;
// // console.log("1 key: ", select_att);
// console.log("target: ", target_value);

// // 최대 6개 선택
// if (select_btn.length === 6) {
//   if (keyword_btn.className === "btn on") {
//     keyword_btn.classList.toggle("on");
//     setSelect(select.filter((key) => key !== target_data));
//     setSelect_btn(select_btn.filter((key) => key !== target_value));
//     setSelect_att(select_att.filter((key) => key !== target_att));
//     console.log("4: ", select_att);
//     return;
//   }
// } else if (select_btn.length < 6) {
//   keyword_btn.classList.toggle("on");
//   if (keyword_btn.className === "btn on") {
//     setKeyState(true);
//     setSelect([...select, target_data]);
//     setSelect_btn([...select_btn, target_value]);
//     setSelect_att([...select_att, target_att]);
//     console.log("5: ", select_att);
//   } else if (keyword_btn.className === "btn") {
//     setSelect(select.filter((key) => key !== target_value));
//     setSelect_btn(select_btn.filter((key) => key !== target_value));
//     setSelect_att(
//       select_att.filter((key) => key.filter !== target_att.filter)
//     );
//     console.log("6: ", select_att);
//   }
// }
// console.log("2 key: ", select_att);
// toggleResultListOn();
// };

// const select_result = (event) => {
//   // 데이터 가공 코드

//   const target = event.target.innerText;
//   const target_star = keywords.find(
//     (element) => element.song_title === target
//   );
//   const target_coordinate = star_graphic.find(
//     (element) => element.song_title === target
//   );

//   const info_target = star_graphic.findIndex(
//     (element) => element.song_title === target
//   );

//   const widthOffset = 1000 - target_coordinate.x;
//   const heightOffset = 1000 - target_coordinate.y; // scale 1.0

//   setSpacePosition({
//     transform: `translate(${widthOffset}px, ${heightOffset}px)`,
//   });

//   const tag_array = Object.values(target_star)
//     .filter((item) => item !== "")
//     .filter((item) => item !== null);

//   for (let i = tag_array.length; i < 7; ++i) {
//     tag_array.push("-");
//   }

//   axios
//     .get(`https://c-2022yh.space/information/search=${target}`)
//     .then((response) => setAlbumInfo(response.data));

//   if (toggle_state) {
//     for (let i = 0; i < result_list.length; ++i) {
//       event.target.parentNode.childNodes[i].classList.remove("on");
//     }
//   }
//   reset_info_toggle();

//   info_ref.current[info_target].classList.add("active"); //song info
//   setPlayerTag(tag_array.filter((item) => item !== null));
//   event.target.classList.add("on");
//   onSetPlayerTagData();
//   setPlayerState(true);
//   console.log("2 res: ", select_att);
// };
