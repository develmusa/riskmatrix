var items = [
    ['yellow', 'red', 'red'],
    ['green', 'yellow', 'red'],
    ['green', 'green', 'yellow']
];

var rectSize = 100;

var risks = [];

function setup() {
    createCanvas(400, 400);
    risks.push(new Risk());
}



function draw() {
    var rectArray=new Array(3)
    for (var i=0; i <3; i++) {
        rectArray[i] = new Array(3)
    }

      for(var i = 0; i < rectArray.length; i++){
          for(var j = 0; j < rectArray.length; j++) {
              var rectangle = new Rect(rectSize *i , rectSize * j, rectSize , rectSize , items[j][i].toString());
              rectangle.show();
          }
    }

    for (var i = 0; i < risks.length; i++){
        risks[i].render();
    }
}