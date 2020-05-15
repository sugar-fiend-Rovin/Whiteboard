var context = $("#whiteboard")[0].getContext("2d");
mousedown = false;
eraser = false;
rectangle = false;
circle = false;
var previous;
var starting_x;
var starting_y;
var undo = [$("#whiteboard")[0].toDataURL()];
var redo = [];
var width = 0;
var height = 0;
var offset = $("#whiteboard").offset();
$(document).ready(function(){
  $("#whiteboard").on({

    // when mouse is clicked
    mousedown: function(event){
    mousedown = true;
    redo = [];
    context.moveTo(event.pageX- offset.left,event.pageY - offset.top);
    if( rectangle || circle)
    {
      starting_x = event.pageX- offset.left;
      starting_y = event.pageY - offset.top;
    }
    context.beginPath();
    if (!eraser) {
      context.strokeStyle = $("#colors")[0].value;
    }
    context.lineWidth = $("#brushsize")[0].value;
    },

    // when mouse is released
    mouseup: function(){
    mousedown = false;
    width = 0;
    height = 0;
    undo.push($("#whiteboard")[0].toDataURL());

    },

    // when the mouse moves
    mousemove: function(event){
      if (mousedown == true) {
        if (rectangle) {
          context.clearRect(starting_x, starting_y, width, height);
          context.strokeRect(starting_x, starting_y, event.pageX-offset.left - starting_x, event.pageY - offset.top - starting_y);
          width = event.pageX-offset.left - starting_x;
          height = event.pageY - offset.top - starting_y;

        } 
        else if (circle) {
          context.arc(starting_x, starting_y, Math.hypot(event.pageX-offset.left - starting_x,event.pageY - offset.top - starting_y), 0, 2 * Math.PI);
          context.stroke();
        }
        else {
          context.lineTo(event.pageX-offset.left,event.pageY - offset.top);
          context.stroke();
        }
      }
    }
  });

  //clear button
  $("#clear").click(function(){
    context.clearRect(0, 0, 800, 400);
  });

  //eraser
  $("#eraser").click(function(){
    context.strokeStyle = "white";
    eraser = true;
    rectangle = false;
    circle = false;

  });

  // revert back to brush
  $("#brush").click(function(){
    eraser = false;
    rectangle = false;
    circle = false;
  });

  // draw rectangles
  $("#rectangle").click(function(){
    if (eraser) {
      eraser = false;
    }
    rectangle = true;
  });

  // draw circles
  $("#circle").click(function(){
    if (eraser) {
      eraser = false;
    }
    circle = true;
  });

  // undo
  $("#undo").click(function(){
    if (undo.length > 1) {
      var dataURL = undo.pop();
      redo.push(dataURL);
      dataURL = undo.pop();
      undo.push(dataURL)
      var image = new Image();
      image.onload = function(){
        context.clearRect(0, 0, 800, 400);
        context.drawImage(image,0, 0, 800, 400);
      };
      image.src = dataURL;
    }
  });

  //redo
  $("#redo").click(function(){
    if (redo.length){
    var dataURL = redo.pop();
    undo.push(dataURL);
    var image = new Image();
    image.onload = function(){
      context.clearRect(0, 0, 800, 400);
      context.drawImage(image,0, 0, 800, 400);
    };
    image.src = dataURL;
    }
  });
});