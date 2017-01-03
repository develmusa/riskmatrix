/**
 * Created by samuel on 30.12.16.
 */



function Risk(nr, likelihood, consequence){
    this.nr = nr;
    this.likelihood = likelihood;
    this.consequence = consequence;
    this.pos = createVector();

    this.setPosition = function (x, y){
        this.pos.x = x;
        this.pos.y = y;
    };

    this.render = function(){
        push();
        fill(riskColor)
        ellipse(this.pos.x, this.pos.y, riskSize);
        fill(riskTextColor);
        textSize(riskTextSize);
        textAlign(CENTER,CENTER);
        text(this.nr,this.pos.x, this.pos.y);
        pop();
    }
}