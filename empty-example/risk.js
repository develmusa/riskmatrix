/**
 * Created by samuel on 30.12.16.
 */
function Risk(){
    this.pos = createVector(random(width), random(height));
    this.r = 50;

    this.render = function(){
        push();
        translate(this.pos.x, this.pos.y)
        ellipse(0,0, this.r * 2)
        pop();
    }
}