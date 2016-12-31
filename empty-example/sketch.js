var items = [
    ['yellow', 'red', 'red'],
    ['green', 'yellow', 'red'],
    ['green', 'green', 'yellow']
];

var risksInput = [[1,1,3],[2,1,3],[3,1,3],[4,1,3],[5,1,3],[6,1,3],[7,1,3],[8,1,3],[9,1,3],[10,1,3],[11,1,3],[12,1,3],[13,1,3],
    [1,1,2],[2,1,2],[3,1,2],[4,1,2],[5,1,2],[6,1,2],[7,1,2],[8,1,2],
    [1,2,1],[2,2,1],
    [1,2,2],[2,2,2],[3,2,2],[4,2,2],[5,2,2],
    [1,1,1],[2,1,1],[3,1,1]];

var inputLikelihood;
var inputConsequence;
var elementPartition, elementLikelihood, elementConsequence;
var table;
var offsetXMatrix = 100;
var offsetYMatrix = 150;
var sizeXMatrix = 400;
var sizeYMatrix = 400;
var rectArray;
var marginDescriptionVector = 20;
var arrowLength = 20;
var arrowThickness = 10;

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
//    risks.push(new Risk(1,2,3));
    drawMatrix();
    populateMatrix();
    showRisks();



}

function drawMatrix(){
    clear();
    drawDescriptionVector();
    var partitionsLikelihood = parseInt(inputLikelihood.value());
    var Partitionsconsequence = parseInt(inputConsequence.value());
    //console.log('partitionsLikelihood: ', partitionsLikelihood);
    //console.log('Partitionsconsequence: ', Partitionsconsequence);
    rectArray=new Array(partitionsLikelihood);
    for (var i=0; i < partitionsLikelihood; i++) {
        rectArray[i] = new Array(Partitionsconsequence);
    }
    for(var i = 0; i < rectArray.length; i++){
        for(var j = 0; j < rectArray[i].length; j++) {
            rectArray[i][j] = new Rect(offsetXMatrix + sizeXMatrix / partitionsLikelihood *i , offsetYMatrix + sizeYMatrix / Partitionsconsequence * j, sizeXMatrix / partitionsLikelihood  , sizeYMatrix / Partitionsconsequence , 'white');
            rectArray[i][j].show();
            //console.log('partitionsLikelihood: ', i, 'Partitionsconsequence: ', j);
        }
    }
}

function drawDescriptionVector(){
    var startPointVertical = createVector(offsetXMatrix -marginDescriptionVector, offsetYMatrix);
    var endPointVertical = createVector(offsetXMatrix -marginDescriptionVector, offsetYMatrix + sizeYMatrix);
    var endPointHorizontal= createVector(offsetXMatrix + sizeXMatrix , offsetYMatrix + sizeYMatrix + marginDescriptionVector);
    var startPointHorizontal = createVector(offsetXMatrix, offsetYMatrix + sizeYMatrix + marginDescriptionVector);
    push();
    line(startPointVertical.x, startPointVertical.y, endPointVertical.x, endPointVertical.y);
    line(startPointHorizontal.x , startPointHorizontal.y, endPointHorizontal.x, endPointHorizontal.y);
    fill('black');
    triangle(startPointVertical.x,startPointVertical.y,startPointVertical.x - arrowThickness/2,startPointVertical.y+arrowLength,startPointVertical.x+ arrowThickness/2,startPointVertical.y+arrowLength);
    triangle(endPointHorizontal.x,endPointHorizontal.y,endPointHorizontal.x - arrowLength,endPointHorizontal.y - arrowThickness/2,endPointHorizontal.x - arrowLength,endPointHorizontal.y + arrowThickness/2);
    pop();

}
function populateMatrix(){
    for (var i = 0; i < risksInput.length; i++){
        var likelihood = risksInput[i][1] -1;
        var consequence = risksInput[i][2] -1;
        rectArray[likelihood][consequence].addRisk(risksInput[i]);
    }

}

function showRisks(){
    for(var i = 0; i < rectArray.length; i++) {
        for (var j = 0; j < rectArray[i].length; j++) {
            rectArray[i][j].renderRisks();
        }
    }
}


function draw() {
    //background(slider.value());

 //   for (var i = 0; i < risks.length; i++){
  //      risks[i].render();

}