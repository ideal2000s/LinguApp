import $ from 'jquery';

$(document).ready(function() {
  $('.container .content .card .card-header .preview-task-btn').on('click', function(e) {
    e.preventDefault();
    $('.task_preview').toggle();
  })

  dragElement(document.querySelector(".task_preview"));

  function dragElement(el) {
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    const taskPreviewHeader = document.querySelector(".task_preview_header");

    if (taskPreviewHeader) {
      taskPreviewHeader.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();

      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;

      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();

      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // console.log(document.body.clientWidth, document.body.clientHeight, pos3, pos4)

      // set the element's new position:
      el.style.top = (el.offsetTop - pos2) + "px";
      el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
});

$('#task_preview_close').on('click', function() {
  $('.task_preview').hide();
});
