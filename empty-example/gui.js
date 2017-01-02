/**
 * Created by sikcd on 02.01.2017.
 */
function GUI(){
    var gui = new dat.GUI();

    var keys = {
        "Arrow Thickness": arrowThickness,
        "Arrow Length": arrowLength,
        "Arrow Distance": marginDescriptionVector,
        "Description Distance": arrowDescriptionMargin,
        "Description Size": descriptionSize
    };

    var f1 = gui.addFolder("Matrix");
    var f1_1 = f1.addFolder("Description Vector");
    var f2 = gui.addFolder("Risks");

    var controller = f1_1.add(keys, "Arrow Thickness", 0, 50).step(1);
    controller.onFinishChange(function (value) {
        console.log(value);
        arrowThickness = value;
    });

    var controller = f1_1.add(keys, "Arrow Length", 0, 50).step(1);
    controller.onFinishChange(function (value) {
        console.log(value);
        arrowLength = value;
    });

    var controller = f1_1.add(keys, "Arrow Distance", 0, 50).step(1);
    controller.onFinishChange(function (value) {
        console.log(value);
        marginDescriptionVector = value;
    });

    var controller = f1_1.add(keys, "Description Distance", 0, 50).step(1);
    controller.onFinishChange(function (value) {
        console.log(value);
        arrowDescriptionMargin = value;
    });

    var controller = f1_1.add(keys, "Description Size", 0, 50).step(1);
    controller.onFinishChange(function (value) {
        console.log(value);
        descriptionSize = value;
    });

}