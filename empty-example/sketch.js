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
var arrowDescriptionMargin = 20;
var descriptionSize = 15;
var sliderUpperBorder, sliderLowerBorder, sliderRiskSize;
var gui;
var riskColor = "#969696";
var riskTextColor = '#000000';
var riskSize = 40;
var riskTextSize = 15;
var riskArray = [];


function setup() {
    var canvas = createCanvas(600, 600);
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

    sliderUpperBorder = createSlider(-1000, +1000, -sizeYMatrix);
    sliderUpperBorder.position(250, 25);

    sliderLowerBorder = createSlider(-1000, +1000, -sizeYMatrix);
    sliderLowerBorder.position(250, 50);

    sliderRiskSize = createSlider(1, 100, 20);
    sliderRiskSize.position(250, 75);

    sliderUpperBorder.input(drawAll);
    sliderLowerBorder.input(drawAll);
    sliderRiskSize.input(drawAll);

    inputLikelihood.input(drawAll);
    inputConsequence.input(drawAll);
    gui = new GUI();
    drawAll()



}

function drawAll(){
    drawMatrix();
    generateRisks();
    mapRisksToRectangles();
    showRisks();
}

function drawMatrix(){
    clear();
    drawDescriptionVector();
    push();
    var partitionsLikelihood = parseInt(inputLikelihood.value());
    var Partitionsconsequence = parseInt(inputConsequence.value());
    //set cordinatas(0,0) in the left bottom edge of the graph
    translate(offsetXMatrix, offsetYMatrix + sizeYMatrix);
    var yInterceptUpper= -sliderUpperBorder.value();
    var yInterceptLower= -sliderLowerBorder.value();
    var slope = -(0-sizeYMatrix/sizeXMatrix-0);
    var xRectangle;
    var yRectangle;
    var widthRectangle;
    var heightRectangle;
    var colorRectangle;


    rectArray=new Array(partitionsLikelihood);
    for (var i=0; i < partitionsLikelihood; i++) {
        rectArray[i] = new Array(Partitionsconsequence);
    }
    for(var i = 0; i < rectArray.length; i++){
        for(var j = 0; j < rectArray[i].length; j++) {
            xRectangle = sizeXMatrix / partitionsLikelihood *i;
            yRectangle = sizeYMatrix / Partitionsconsequence * j - sizeYMatrix;
            widthRectangle = sizeXMatrix / partitionsLikelihood;
            heightRectangle = sizeYMatrix / Partitionsconsequence;

            if((yRectangle-widthRectangle/2)< (slope*(xRectangle-heightRectangle/2)+yInterceptUpper)) {
                colorRectangle = 'red';
            }else if((yRectangle-widthRectangle/2) > (slope*(xRectangle-heightRectangle/2)+yInterceptUpper) && (yRectangle-widthRectangle/2)< (slope*(xRectangle-heightRectangle/2)+yInterceptLower) ){
                colorRectangle = 'yellow';
            } else {
                colorRectangle = 'green';
            }

            rectArray[i][j] = new Rect(xRectangle ,yRectangle, widthRectangle  , heightRectangle , colorRectangle);
            rectArray[i][j].show();
            //console.log('partitionsLikelihood: ', i, 'Partitionsconsequence: ', j);
        }
    }

    line(0,slope*0+yInterceptUpper,sizeXMatrix,slope*sizeXMatrix+yInterceptUpper);
    line(0,slope*0+yInterceptLower,sizeXMatrix,slope*sizeXMatrix+yInterceptLower);
    pop();

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
    textSize(descriptionSize);
    textAlign(CENTER,CENTER);
    text("Consequence",startPointHorizontal.x+(endPointHorizontal.x-startPointHorizontal.x)/2,arrowDescriptionMargin + startPointHorizontal.y + (endPointHorizontal.y-startPointHorizontal.y)/2);
    translate(startPointVertical.x- arrowDescriptionMargin +(endPointVertical.x-startPointVertical.x)/2,startPointVertical.y + (endPointVertical.y-startPointVertical.y)/2);
    rotate(radians(90));
    text("Likelihood",0,0);
    pop();

}
function generateRisks(){
    for (var i = 0; i < risksInput.length; i++){
        riskArray[i] = new Risk(risksInput[i][0],risksInput[i][1],risksInput[i][2])
    }

}

function mapRisksToRectangles(){
    for (var i = 0; i < riskArray.length; i++){
        var likelihood = riskArray[i].likelihood -1;
        var consequence = riskArray[i].consequence -1;
        rectArray[likelihood][consequence].addRisk(riskArray[i]);
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

    if(sliderUpperBorder.value() < sliderLowerBorder.value()) {
        sliderLowerBorder.value(sliderUpperBorder.value());
    }
    drawAll();
}

//saveCanvas('myCanvas', 'png');