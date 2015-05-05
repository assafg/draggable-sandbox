$(document).ready(function(){
  console.log('hello');



  var $container = $("#container"),
    gridWidth = 196,
    gridHeight = 100,
    gridRows = 5,
    gridColumns = 4,
    i, x, y;

  for (i = 0; i < gridRows * gridColumns; i++) {
      y = Math.floor(i / gridColumns) * gridHeight;
      x = (i * gridWidth) % (gridColumns * gridWidth);
      $("<div/>").css({position:"absolute", border:"1px solid #FFFFFF", width:gridWidth-1, height:gridHeight-1, top:y, left:x}).prependTo($container);
  }

  TweenLite.set($container, {height: gridRows * gridHeight + 1, width: gridColumns * gridWidth + 1});
  TweenLite.set(".box", {width:gridWidth, height:gridHeight, lineHeight:gridHeight + "px"});

  function getTransform(el) {
      var results = $(el).css('transform').match(/matrix(?:(3d)\(\d+(?:, \d+)*(?:, (\d+))(?:, (\d+))(?:, (\d+)), \d+\)|\(\d+(?:, \d+)*(?:, (\d+))(?:, (\d+))\))/)
      if(!results){
        return {
          x: 0, y:0
        }
      }
      return {
        x: results[results.length-2],
        y: results[results.length-1]
      }
  }

  $(".box").each(function(index, element) {
              TweenLite.to(element, 0.5, {
                  x:Math.round(getTransform(element).x / gridWidth) * gridWidth,
                  y:Math.round(getTransform(element).y / gridHeight) * gridHeight,
                  delay:0.1,
                  ease:Power2.easeInOut
              });
          });

  Draggable.create(".box", {
      type:"x,y",
      edgeResistance:0.65,
      bounds:"#container",
      throwProps:false,
      liveSnap: false,
      snap: {
          x: function(endValue) {
            console.log(endValue);
              return Math.round(endValue / gridWidth) * gridWidth;
          },
          y: function(endValue) {
              return Math.round(endValue / gridHeight) * gridHeight;
          }
      }
  });});
