const box = document.getElementById("box");
let dragStart = false;
let initX, initY, newX, newY;

box.onmousedown = function (e) {
  dragStart = true;
  initX = e.pageX;
  initY = e.pageY;
  offsetLeft = box.offsetLeft;
  offsetTop = box.offsetTop;
  box.classList.add("dragged");
  box.addEventListener("mouseup", stop);
  box.addEventListener("mousemove", move);
};
function stop(e) {
  dragStart = false;
  box.classList.remove("dragged");
  console.log(box.getBoundingClientRect());
  box.animate(
    [
      { top: `${box.style.top}`, left: `${box.style.left}` },
      { top: `10px`, left: `10px` },
    ],
    {
      duration: 500,
    }
  ).onfinish = () => {
    (box.style.top = "10px"), (box.style.left = "10px");
  };
}
function moveBoxToPosition(e, xPos, yPos) {}
function move(e) {
  if (dragStart) {
    e.preventDefault();
    newX = offsetLeft + e.pageX - initX;
    newY = offsetTop + e.pageY - initY;

    box.style.left = `${newX}px`;
    box.style.top = `${newY}px`;
  }
}
