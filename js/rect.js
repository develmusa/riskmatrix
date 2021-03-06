/**
 * Created by samuel on 30.12.16.
 */
function Rect(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    var riskObjectArray = [];
    this.r = 20;

    this.show = function () {
        push();
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
        pop();
    };

    this.addRisk = function (risk) {
        riskObjectArray.push(risk);
    };

    this.renderRisks = function () {
        for (var i = 0; i < riskObjectArray.length; i++) {
            var xCount = Math.ceil(Math.sqrt(riskObjectArray.length));
            var yCount = Math.round(Math.sqrt(riskObjectArray.length));
            var xNr = i % xCount + 1;
            var yNr = Math.floor(i / xCount) + 1;
            var xPosition = this.x + (width / (xCount + 1) * xNr);
            var yPosition = this.y + (height / (yCount + 1) * yNr);
            push();
            translate(offsetXMatrix, offsetYMatrix + sizeYMatrix);
            riskObjectArray[i].setPosition(xPosition, yPosition);
            riskObjectArray[i].render();
            pop();
        }
    };
}