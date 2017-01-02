/**
 * Created by sikcd on 02.01.2017.
 */
function GUI(){
    var gui = new dat.GUI();

    var descriptionKeys = {
        "Arrow Thickness": arrowThickness,
        "Arrow Length": arrowLength,
        "Arrow Distance": marginDescriptionVector,
        "Description Distance": arrowDescriptionMargin,
        "Description Size": descriptionSize
    };

    var risksKeys = {
        "Size": riskSize,
        "Color": riskColor,
        "Text Size": riskTextSize,
        "Text Color": riskTextColor
    };

    var f1 = gui.addFolder("Matrix");
    var f1_1 = f1.addFolder("Description Vector");
    var f2 = gui.addFolder("Risks");


    var controller = f1_1.add(descriptionKeys, "Arrow Thickness", 0, 50).step(1);
    controller.onFinishChange(function (value) {
        arrowThickness = value;
    });
    var controller = f1_1.add(descriptionKeys, "Arrow Length", 0, 50).step(1);
    controller.onFinishChange(function (value) {
        arrowLength = value;
    });
    var controller = f1_1.add(descriptionKeys, "Arrow Distance", 0, 50).step(1);
    controller.onFinishChange(function (value) {
        marginDescriptionVector = value;
    });
    var controller = f1_1.add(descriptionKeys, "Description Distance", 0, 50).step(1);
    controller.onFinishChange(function (value) {
        arrowDescriptionMargin = value;
    });
    var controller = f1_1.add(descriptionKeys, "Description Size", 0, 50).step(1);
    controller.onFinishChange(function (value) {
        descriptionSize = value;
    });


    //Risks
    var controller = f2.add(risksKeys, "Size", 0, 100).step(1);
    controller.onFinishChange(function (value) {
        riskSize = value;
    });
    var controller = f2.addColor(risksKeys, 'Color');
    controller.onFinishChange(function (value) {
        riskColor = value;
    });
    var controller = f2.add(risksKeys, "Text Size", 0, 100).step(1);
    controller.onFinishChange(function (value) {
        riskTextSize = value;
    });
    var controller = f2.addColor(risksKeys, 'Text Color');
    controller.onFinishChange(function (value) {
        riskTextColor = value;
    });






}