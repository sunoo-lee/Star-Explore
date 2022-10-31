// function draw_line(event) {
//   const childLine = event.target.childNodes;
//   if (childLine.length !== 0) {
//     event.target.innerHTML = "";
//   } else if (childLine.length === 0) {
//     let x = event.target.offsetLeft;
//     let y = event.target.offsetTop;

//     let targetX = selectedKey.current[5].offsetLeft;
//     let targetY = selectedKey.current[5].offsetTop;

//     let resultX = targetX - x;
//     let resultY = targetY - y;

//     const result = Math.sqrt(Math.pow(resultX, 2) + Math.pow(resultY, 2));

//     const radian = Math.atan(resultX / resultY);
//     let degree;
//     if (resultX < 0 || resultY < 0) {
//       degree = 270 - 57 * radian;
//     } else if (resultX >= 0 && resultY >= 0) {
//       degree = 90 - 57 * radian;
//     }

//     let line = document.createElement("div");
//     line.classList.add("star_line");
//     line.style.borderColor = "aliceblue";
//     line.style.width = `${result}px`;
//     line.style.transform = `translate(10px, 10px) rotate(${degree}deg)`;
//     event.target.append(line);
//   }
// }
// const zoomScroll = () => {
//   const zoomElement = document.querySelector(".star_filter");
//   let zoom = 1;
//   const ZOOM_SPEED = 0.1;

//   document.addEventListener("wheel", function (e) {
//     if (e.deltaY > 0) {
//       zoomElement.style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
//     } else {
//       zoomElement.style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
//     }
//   });
// };

// const playerChange = (event) => {
//   const player_title =
//     event.target.parentNode.parentNode.parentNode.parentNode.childNodes[1]
//       .childNodes[0].innerHTML;
// const player_title =
//   event.target.parentNode.childNodes[1].childNodes[0].innerHTML;
//   const tags = Object.values(
//     event.target.parentNode.parentNode.parentNode.parentNode.dataset
//   );
//   setPlayerTag([player_title, ...tags]);
// console.dir(event.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].innerHTML);
// };
