/**
 * Created by samuel on 30.12.16.
 */
function Rect(x, y, width, height, color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.show = function(){
        push();
        fill(this.color);
        rect(this.x , this.y, this.width, this.height);
        pop();
    }
}