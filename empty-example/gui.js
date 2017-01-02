/**
 * Created by sikcd on 02.01.2017.
 */
function GUI(){
    this.gui = new dat.GUI();

    var matrixKeys = {
        "Upper Border": upperBorder,
        "Lower Border": lowerBorder
    };

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

    var f1 = this.gui.addFolder("Matrix");
    var f1_1 = f1.addFolder("Description Vector");
    var f2 = this.gui.addFolder("Risks");

    //Matrix
    var controller = f1.add(matrixKeys, "Upper Border", 0, 1000).step(1).listen();
    controller.onFinishChange(function (value) {
        upperBorder = value;
        if (lowerBorder > upperBorder)
            lowerBorder = upperBorder;
    });

    controller = f1.add(matrixKeys, "Lower Border", 0, 1000).step(1).listen();
    controller.onFinishChange(function (value) {
        lowerBorder = value;
        if (upperBorder < lowerBorder)
            upperBorder = lowerBorder;
    });

    //Description Vector
    controller = f1_1.add(descriptionKeys, "Arrow Thickness", 0, 50).step(1);
    controller.onFinishChange(function (value) {
        arrowThickness = value;
    });
    controller = f1_1.add(descriptionKeys, "Arrow Length", 0, 50).step(1);
    controller.onFinishChange(function (value) {
        arrowLength = value;
    });
    controller = f1_1.add(descriptionKeys, "Arrow Distance", 0, 50).step(1);
    controller.onFinishChange(function (value) {
        marginDescriptionVector = value;
    });
    controller = f1_1.add(descriptionKeys, "Description Distance", 0, 50).step(1);
    controller.onFinishChange(function (value) {
        arrowDescriptionMargin = value;
    });
    controller = f1_1.add(descriptionKeys, "Description Size", 0, 50).step(1);
    controller.onFinishChange(function (value) {
        descriptionSize = value;
    });


    //Risks
    controller = f2.add(risksKeys, "Size", 0, 100).step(1);
    controller.onFinishChange(function (value) {
        riskSize = value;
    });
    controller = f2.addColor(risksKeys, 'Color');
    controller.onFinishChange(function (value) {
        riskColor = value;
    });
    controller = f2.add(risksKeys, "Text Size", 0, 100).step(1);
    controller.onFinishChange(function (value) {
        riskTextSize = value;
    });
    controller = f2.addColor(risksKeys, 'Text Color');
    controller.onFinishChange(function (value) {
        riskTextColor = value;
    });


    this.updateMaxValueBorderControllers = function(){
        for (var i = 0; i < this.gui.__folders.Matrix.__controllers.length; i++) {
            if (this.gui.__folders.Matrix.__controllers[i].property == "Upper Border" || this.gui.__folders.Matrix.__controllers[i].property == "Lower Border" )
                this.gui.__folders.Matrix.__controllers[i].max(-1*yInterceptMax);
        }
    };
}