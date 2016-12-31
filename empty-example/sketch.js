var items = [
    ['yellow', 'red', 'red'],
    ['green', 'yellow', 'red'],
    ['green', 'green', 'yellow']
];

var rectSize = 100;

var risks = [];

var inputLikelihood;
var inputConsequence;
var elementPartition, elementLikelihood, elementConsequence;

function setup() {
    createCanvas(windowWidth, windowHeight);
    elementPartition= createElement('h2', 'Partition Count:');
    elementPartition.position(20, 5);

    elementLikelihood= createElement('p', 'Likelihood:');
    elementLikelihood.position(20, 75);
    inputLikelihood = createInput([3]);
    inputLikelihood.position(120, 90);
    inputLikelihood.size(15)

    elementConsequence= createElement('p', 'Consequence:');
    elementConsequence.position(20, 105);
    inputConsequence = createInput([3]);
    inputConsequence.position(120, 120);
    inputConsequence.size(15)

    inputLikelihood.input(drawMatrix);
    inputConsequence.input(drawMatrix);
    drawMatrix();
    risks.push(new Risk());
}

function drawMatrix(){
    clear();
    var offsetX = 100;
    var offsetY = 150;
    var partitionsLikelihood = parseInt(inputLikelihood.value());
    var Partitionsconsequence = parseInt(inputConsequence.value());
    console.log('partitionsLikelihood: ', partitionsLikelihood);
    console.log('Partitionsconsequence: ', Partitionsconsequence);
    var rectArray=new Array(partitionsLikelihood);
    for (var i=0; i < partitionsLikelihood; i++) {
        rectArray[i] = new Array(Partitionsconsequence);
    }

    for(var i = 0; i < rectArray.length; i++){
        for(var j = 0; j < rectArray[i].length; j++) {
            var rectangle = new Rect(offsetX + rectSize *i , offsetY + rectSize * j, rectSize , rectSize , 'yellow');
            rectangle.show();
            console.log('partitionsLikelihood: ', i, 'Partitionsconsequence: ', j);
        }
    }
}



function draw() {
    //background(slider.value());

    for (var i = 0; i < risks.length; i++){
        risks[i].render();
    }
}