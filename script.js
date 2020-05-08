context = $("#whiteboard")[0].getContext("2d");
mousedown = false;
var rect = $("#whiteboard")[0].getBoundingClientRect()
$(document).ready(function(){
  $("#whiteboard").on({
    mousedown: function(event){
    mousedown = true;
    context.moveTo(event.pageX- rect.left,event.pageY - rect.top);
    context.beginPath();
    },
    mouseup: function(){
    mousedown = false;
    },
    mousemove: function(event){
      if (mousedown == true) {
      context.lineTo(event.pageX- rect.left,event.pageY - rect.top);
      context.stroke();
      }

    }
  });
});