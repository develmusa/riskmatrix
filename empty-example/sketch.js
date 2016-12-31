var items = [
    ['yellow', 'red', 'red'],
    ['green', 'yellow', 'red'],
    ['green', 'green', 'yellow']
];

var rectSize = 100;

var risksInput = [[1,2,3],[2,1,3],[3,1,3]];

var risks = [];



var inputLikelihood;
var inputConsequence;
var elementPartition, elementLikelihood, elementConsequence;
var table;
var offsetXMatrix = 100;
var offsetYMatrix = 150;
var sizeXMatrix = 400;
var sizeYMatrix = 400;

function setup() {
    createCanvas(600, 600);
    elementPartition= createElement('h2', 'Partition Count:');
    elementPartition.position(20, 5);

    elementLikelihood= createElement('p', 'Likelihood:');
    elementLikelihood.position(20, 75);
    inputLikelihood = createInput([3]);
    inputLikelihood.position(120, 90);
    inputLikelihood.size(15);

    elementConsequence= createElement('p', 'Consequence:');
    elementConsequence.position(20, 105);
    inputConsequence = createInput([3]);
    inputConsequence.position(120, 120);
    inputConsequence.size(15);

    inputLikelihood.input(drawMatrix);
    inputConsequence.input(drawMatrix);
    risks.push(new Risk(1,2,3));
    drawMatrix();
    populateMatrix();

}

function drawMatrix(){
    clear();
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
            var rectangle = new Rect(offsetXMatrix + sizeXMatrix / partitionsLikelihood *i , offsetYMatrix + sizeYMatrix / Partitionsconsequence * j, sizeXMatrix / partitionsLikelihood  , sizeYMatrix / Partitionsconsequence , 'yellow');
            rectangle.show();
            console.log('partitionsLikelihood: ', i, 'Partitionsconsequence: ', j);
        }
    }
}

function populateMatrix(){

}


function draw() {
    //background(slider.value());

    for (var i = 0; i < risks.length; i++){
        risks[i].render();
    }
}