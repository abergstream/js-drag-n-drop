const box = document.getElementById("box");
const slot = document.getElementById("slot");
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
  if (isCollapsed(box, slot)) {
    box.animate(
      [
        { top: `${box.style.top}`, left: `${box.style.left}` },
        { top: `${slot.offsetTop}px`, left: `${slot.offsetLeft}px` },
      ],
      {
        duration: 200,
      }
    ).onfinish = () => {
      (box.style.top = `${slot.offsetTop}px`),
        (box.style.left = `${slot.offsetLeft}px`);
    };
  } else {
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
}
function moveBoxToPosition(e, xPos, yPos) {}
function move(e) {
  if (dragStart) {
    e.preventDefault();
    newX = offsetLeft + e.pageX - initX;
    newY = offsetTop + e.pageY - initY;

    box.style.left = `${newX}px`;
    box.style.top = `${newY}px`;
    if (isCollapsed(box, slot)) {
      slot.classList.add("box-collapsed");
    } else {
      slot.classList.remove("box-collapsed");
    }
  }
}

function isCollapsed(dragMe, rect) {
  var object_1 = dragMe.getBoundingClientRect();
  var object_2 = rect.getBoundingClientRect();

  if (
    object_1.left < object_2.left + object_2.width &&
    object_1.left + object_1.width > object_2.left &&
    object_1.top < object_2.top + object_2.height &&
    object_1.top + object_1.height > object_2.top
  ) {
    return true;
  } else {
    return false;
  }
}
