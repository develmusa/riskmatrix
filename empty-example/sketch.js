function setup() {
    createCanvas(1000, 1000);
    var rectangle = new Rect(100, 100, 100, 100, 'yellow');
    rectangle.show();


}

var items = [
    ['yellow', 'red', 'red'],
    ['green', 'yellow', 'red'],
    ['green', 'green', 'yellow']
];



function draw() {
    var rectArray=new Array(3)
    for (var i=0; i <3; i++) {
        rectArray[i] = new Array(3)
    }

      for(var i = 0; i < rectArray.length; i++){
          for(var j = 0; j < rectArray.length; j++) {
              var rectangle = new Rect(100 *i , 100 * j, 100, 100, items[j][i].toString());
              rectangle.show();
          }

  //  for(var i = 0; i < items.length; i++){
        //      for(var j = 0; j < items[i].length; j++) {
//
//            fill(items[j][i].toString());
  //          rect(100 *i , 100 * j, 100, 100);
  //          console.log(items[j][i]);
//        }
    }
}