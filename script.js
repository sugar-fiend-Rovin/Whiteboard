var context = $("#whiteboard")[0].getContext("2d");
mousedown = false;
eraser = false;
rectangle = false;
circle = false;
var previous;
var starting_x;
var starting_y;
var radius = 0;
var undo = [$("#whiteboard")[0].toDataURL()];
var redo = [];
var width = 0;
var height = 0;
var offset = $("#whiteboard").offset();

$(document).ready(function () {
  $("#whiteboard").on({
    // when mouse is clicked
    mousedown: function (event) {
      mousedown = true;
      redo = [];
      context.moveTo(event.pageX - offset.left, event.pageY - offset.top);
      context.beginPath();
      if (rectangle || circle) {
        starting_x = event.pageX - offset.left;
        starting_y = event.pageY - offset.top;
      }
      // context.beginPath();
      if (!eraser) {
        context.strokeStyle = $("#colors")[0].value;
      }
      context.lineWidth = $("#brushsize")[0].value;
    },

    // when mouse is released
    mouseup: function () {
      mousedown = false;
      width = 0;
      height = 0;
      radius = 0;
      undo.push($("#whiteboard")[0].toDataURL());
    },

    // when the mouse moves
    mousemove: function (event) {
      if (mousedown == true) {
        if (rectangle) {
          if (width < 0 && height < 0) {
            context.clearRect(
              starting_x + 1 * $("#brushsize")[0].value,
              starting_y + 1 * $("#brushsize")[0].value,
              width - 2 * $("#brushsize")[0].value,
              height - 2 * $("#brushsize")[0].value
            );
          } else if (width < 0) {
            context.clearRect(
              starting_x + 1 * $("#brushsize")[0].value,
              starting_y - 1 * $("#brushsize")[0].value,
              width - 2 * $("#brushsize")[0].value,
              height + 2 * $("#brushsize")[0].value
            );
          } else if (height < 0) {
            context.clearRect(
              starting_x - 1 * $("#brushsize")[0].value,
              starting_y + 1 * $("#brushsize")[0].value,
              width + 2 * $("#brushsize")[0].value,
              height - 2 * $("#brushsize")[0].value
            );
          } else {
            context.clearRect(
              starting_x - 1 * $("#brushsize")[0].value,
              starting_y - 1 * $("#brushsize")[0].value,
              width + 2 * $("#brushsize")[0].value,
              height + 2 * $("#brushsize")[0].value
            );
          }
          width = event.pageX - offset.left - starting_x;
          height = event.pageY - offset.top - starting_y;
          context.strokeRect(starting_x, starting_y, width, height);
        } else if (circle) {
          context.beginPath();
          context.clearRect(
            starting_x - radius - 1,
            starting_y - radius - 1,
            radius * 2 + 2,
            radius * 2 + 2
          );
          radius = Math.hypot(
            event.pageX - offset.left - starting_x,
            event.pageY - offset.top - starting_y
          );
          context.arc(
            starting_x,
            starting_y,
            Math.hypot(
              event.pageX - offset.left - starting_x,
              event.pageY - offset.top - starting_y
            ),
            0,
            2 * Math.PI,
            false
          );
          context.stroke();
          context.closePath();
        } else {
          context.lineTo(event.pageX - offset.left, event.pageY - offset.top);
          context.stroke();
        }
      }
    },
  });

  //clear button
  $("#clear").click(function () {
    context.clearRect(0, 0, 1900, 800);
  });

  //eraser
  $("#eraser").click(function () {
    context.strokeStyle = "white";
    eraser = true;
    rectangle = false;
    circle = false;
  });

  // revert back to brush
  $("#brush").click(function () {
    eraser = false;
    rectangle = false;
    circle = false;
  });

  // draw rectangles
  $("#rectangle").click(function () {
    if (eraser || circle) {
      eraser = false;
      circle = false;
    }
    rectangle = true;
  });

  // draw circles
  $("#circle").click(function () {
    if (eraser || rectangle) {
      eraser = false;
      rectangle = false;
    }
    circle = true;
  });

  // undo
  $("#undo").click(function () {
    if (undo.length > 1) {
      var dataURL = undo.pop();
      redo.push(dataURL);
      dataURL = undo.pop();
      undo.push(dataURL);
      var image = new Image();
      image.onload = function () {
        context.clearRect(0, 0, 1900, 800);
        context.drawImage(image, 0, 0, 1900, 800);
      };
      image.src = dataURL;
    }
  });

  //redo
  $("#redo").click(function () {
    if (redo.length) {
      var dataURL = redo.pop();
      undo.push(dataURL);
      var image = new Image();
      image.onload = function () {
        context.clearRect(0, 0, 1900, 800);
        context.drawImage(image, 0, 0, 1900, 800);
      };
      image.src = dataURL;
    }
  });

  $(".dropbtn").click(function () {
    $("myDropdown").classList.toggle("show");
  });

  // $(window).click(function(event){
  //   if (!event.target.matches('.dropbtn')) {
  //   if ($(".dropdown-content")[0].classList.contains('show')){
  //     $(".dropdown-content")[0].classList.removes('show');
  //   }
  // }
  // });
});
