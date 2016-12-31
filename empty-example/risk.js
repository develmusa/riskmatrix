/**
 * Created by samuel on 30.12.16.
 */
function Risk(nr, likelihood, consequence){
    this.nr = nr;
    this.likelihood = likelihood;
    this.consequence = consequence;
    this.pos = createVector(random(width), random(height));
    this.r = 50;
    var c = color(0,random(100,255),random(0,100));

    this.render = function(){
        push();
        translate(this.pos.x, this.pos.y);
        fill(c);
        ellipse(0,0, this.r * 2)
        pop();
    }
}