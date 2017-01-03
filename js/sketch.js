var sketchContainer = "sketch";
var guiContainer = "sketch-gui";

var risksInput = [[1,1,3],[2,1,3],[3,1,3],[4,1,3],[5,1,3],[6,1,3],[7,1,3],[8,1,3],[9,1,3],[10,1,3],[11,1,3],[12,1,3],[13,1,3],
    [1,1,2],[2,1,2],[3,1,2],[4,1,2],[5,1,2],[6,1,2],[7,1,2],[8,1,2],
    [1,2,1],[2,2,1],
    [1,2,2],[2,2,2],[3,2,2],[4,2,2],[5,2,2],
    [1,1,1],[2,1,1],[3,1,1]];

var inputLikelihood = 3;
var inputConsequence = 3;
var elementPartition, elementLikelihood, elementConsequence;
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
var riskArray = [];

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
        canvasWidth  = canvasHolder.width,
        canvasHeight = canvasHolder.height;

    canvas = createCanvas(canvasSize,canvasSize).parent(canvasHolder);
    /*
      elementPartition= createElement('h2', 'Partition Count:');
    elementPartition.position(20, 5);
    */



    gui = new GUI();
    drawAll();
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

function drawAll(){
    scale(setScaleFactor());
    drawMatrix();
    generateRisks();
    mapRisksToRectangles();
    showRisks();
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
            //console.log('partitionsLikelihood: ', i, 'Partitionsconsequence: ', j);
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

    drawAll();
    //background(0, 100, 200);

}

function saveMatrix(){
    saveCanvas('Risk_Matrix', 'png');
};