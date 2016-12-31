/**
 * Created by samuel on 30.12.16.
 */
function Rect(x, y, width, height, color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    var riskObjectArray = [];
    this.r = 20;

    this.show = function(){
        push();
        fill(this.color);
        rect(this.x , this.y, this.width, this.height);
        pop();
    };

    this.addRisk = function(risk){
        riskObjectArray.push(risk);
    };

    this.renderRisks = function(){
        for (var i = 0; i < riskObjectArray.length; i++){
            //Wrong place, should be inside risk object
            var xPosition = this.x + width / (riskObjectArray.length+ 1) * (i + 1);
            var yPosition = this.y +  height / 2;
            push();
            ellipse(xPosition,yPosition, this.r * 2);
            textSize(15);
            textAlign(CENTER,CENTER);
            text(riskObjectArray[i][0],xPosition,yPosition);
            pop();
        }
    };
}