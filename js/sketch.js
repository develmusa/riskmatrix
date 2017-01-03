var risksInput = [
    {
        nr: 1,
        likelihood: 1,
        consequence: 1,
        isNew: false
    },
    {
        nr: 2,
        likelihood: 1,
        consequence: 1,
        isNew: false
    },
    {
        nr: 3,
        likelihood: 3,
        consequence: 2,
        isNew: false
    },
];

var inputLikelihood = 3;
var inputConsequence = 3;
var table;
var offsetXMatrix = 100;
var offsetYMatrix = 100;
var sizeXMatrix = 600;
var sizeYMatrix = 600;
var rectArray;
var marginDescriptionVector = 20;
var arrowLength = 20;
var arrowThickness = 10;
var arrowDescriptionMargin = 20;
var descriptionSize = 15;

var gui;
var riskColor = "#969696";
var riskTextColor = '#000000';
var riskSize = 40;
var riskTextSize = 15;

var yInterceptUpper;

var yInterceptLower;

var slope = -(0-sizeYMatrix/sizeXMatrix-0);

var yInterceptMax = -sizeYMatrix - sizeXMatrix*slope;

var upperBorder = yInterceptMax / 5 * -3;
var lowerBorder = yInterceptMax / 5 * -2;

var upperSectionColor = "#ff0000";
var middleSectionColor = "#ffff00";
var lowerSectionColor = "#00ff00";
var canvas;
var canvasSize;

function setCanvasSize(){
    if (window.innerWidth < window.innerHeight){
        canvasSize = window.innerWidth;
    } else {
        canvasSize = window.innerHeight
    }
}

function setup() {
    setCanvasSize();
    const canvasHolder = select('#canvasHolder'),

    canvas = createCanvas(canvasSize,canvasSize).parent(canvasHolder);

    frameRate(30);
    /*
      elementPartition= createElement('h2', 'Partition Count:');
    elementPartition.position(20, 5);
    */
    gui = new GUI();
}

function windowResized() {
    setCanvasSize();
    resizeCanvas(canvasSize,canvasSize);
}

function setScaleFactor(){
    var xTotalLength = offsetXMatrix * 2 + sizeXMatrix;
    var yTotalLength = offsetYMatrix * 2 + sizeYMatrix;
    if (xTotalLength >= yTotalLength)
        return canvasSize/xTotalLength;
    return canvasSize/yTotalLength;

}
function drawMatrix(){
    clear();
    drawDescriptionVector();
    push();

    var partitionsLikelihood = parseInt(inputLikelihood);
    var Partitionsconsequence = parseInt(inputConsequence);
    //set cordinatas(0,0) in the left bottom edge of the graph
    translate(offsetXMatrix, offsetYMatrix + sizeYMatrix);
    yInterceptUpper= upperBorder;
    yInterceptLower= lowerBorder;
    slope = -(0-sizeYMatrix/sizeXMatrix-0);

    yInterceptMax = -sizeYMatrix - sizeXMatrix*slope;
    gui.updateMaxValueBorderControllers();

        //y =mx +c
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
            if((yRectangle-widthRectangle/2)< (slope*(xRectangle-heightRectangle/2)-yInterceptUpper)) {
                colorRectangle = upperSectionColor;
            }else if((yRectangle-widthRectangle/2) >= (slope*(xRectangle-heightRectangle/2)-yInterceptUpper) && (yRectangle-widthRectangle/2)<= (slope*(xRectangle-heightRectangle/2)-yInterceptLower) ){
                colorRectangle = middleSectionColor;
            } else {
                colorRectangle = lowerSectionColor;
            }
            rectArray[i][j] = new Rect(xRectangle ,yRectangle, widthRectangle  , heightRectangle , colorRectangle);
            rectArray[i][j].show();
        }
    }

    //line(0,slope*0-yInterceptUpper,sizeXMatrix,slope*sizeXMatrix-yInterceptUpper);
    //line(0,slope*0-yInterceptLower,sizeXMatrix,slope*sizeXMatrix-yInterceptLower);
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
    var risks = [];
    for (var i = 0; i < risksInput.length; i++){
        console.log("riskInputlenght", risksInput.length);
        if (risksInput[i].isNew != true){
            risks[i] = new Risk(risksInput[i].nr,risksInput[i].likelihood,risksInput[i].consequence)
        }

    }
    return risks
}

function mapRisksToRectangles(){
    var risks = generateRisks();
    for (var i = 0; i < risks.length; i++){
        var likelihood = risks[i].likelihood -1;
        var consequence = risks[i].consequence -1;
        rectArray[likelihood][consequence].addRisk(risks[i]);
    }

}

function showRisks(){
    for(var i = 0; i < rectArray.length; i++) {
        for (var j = 0; j < rectArray[i].length; j++) {
            rectArray[i][j].renderRisks();
        }
    }
}

function saveMatrix(){
    saveCanvas('Risk_Matrix', 'png');
}

function drawAll(){
    scale(setScaleFactor());
    drawMatrix();
    mapRisksToRectangles();
    showRisks();
}

function draw() {
    drawAll();
    //background(0, 100, 200);
}
