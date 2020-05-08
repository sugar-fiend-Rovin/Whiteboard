var context = $("#whiteboard")[0].getContext("2d");
mousedown = false;
var offset = $("#whiteboard").offset();
$(document).ready(function(){
  $("#whiteboard").on({
    mousedown: function(event){
    mousedown = true;
    context.moveTo(event.pageX- offset.left,event.pageY - offset.top);
    context.beginPath();
    context.strokeStyle = document.getElementById("colors").value;
    context.lineWidth = document.getElementById("brushsize").value;

    },
    mouseup: function(){
    mousedown = false;
    },
    mousemove: function(event){
      if (mousedown == true) {
      context.lineTo(event.pageX-offset.left,event.pageY - offset.top);
      context.stroke();
      }

    }
  });
  $("#clear").click(function(){
    context.clearRect(0, 0, 800, 400);
  });  
});