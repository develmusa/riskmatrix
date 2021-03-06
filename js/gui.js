/**
 * Created by sikcd on 02.01.2017.
 */
function GUI() {
    this.gui = new dat.GUI({autoPlace: false, width: 350});
    var customContainer = document.getElementById('gui');
    customContainer.appendChild(this.gui.domElement);

    this.gui.close();


    var matrixKeys = {
        "Divisions Likelihood": inputLikelihood,
        "Divisions Consequence": inputConsequence
    };

    var riskSectionKeys = {
        "Upper Border": upperBorder,
        "Lower Border": lowerBorder,
        "Upper Section Color": upperSectionColor,
        "Middle Section Color": middleSectionColor,
        "Lower Section Color": lowerSectionColor
    };

    var descriptionKeys = {
        "Arrow Thickness": arrowThickness,
        "Arrow Length": arrowLength,
        "Arrow Distance": marginDescriptionVector,
        "Description Distance": arrowDescriptionMargin,
        "Description Size": descriptionSize,
        "Index Distance": indexMargin,
        "Index Size": indexTextSize
    };

    var riskKeys = {
        "Size": riskSize,
        "Color": riskColor,
        "Text Size": riskTextSize,
        "Text Color": riskTextColor
    };

    var mainKeys = {
        "Save Matrix": function () {
            saveMatrix()
        },
        "Edit Risks": function () {
            editRisks()
        }

    };

    var controller;
    var f1 = this.gui.addFolder("Matrix");
    var f1_1 = f1.addFolder("Description Vector");
    var f1_2 = f1.addFolder("Risk Section");
    var f2 = this.gui.addFolder("Risk");

    this.gui.add(mainKeys, "Edit Risks");
    this.gui.add(mainKeys, "Save Matrix");


    //Matrix
    controller = f1.add(matrixKeys, "Divisions Likelihood", inputConsequenceMin, 10).step(1).listen();
    controller.onFinishChange(function (value) {
        inputLikelihood = value;
    });

    controller = f1.add(matrixKeys, "Divisions Consequence", inputConsequenceMin, 10).step(1).listen();

    controller.onFinishChange(function (value) {
        inputConsequence = value;
    });
    //Description Vector
    controller = f1_1.add(descriptionKeys, "Arrow Thickness", 0, 50).step(1);
    controller.onChange(function (value) {
        arrowThickness = value;
    });
    controller = f1_1.add(descriptionKeys, "Arrow Length", 0, 50).step(1);
    controller.onChange(function (value) {
        arrowLength = value;
    });
    controller = f1_1.add(descriptionKeys, "Arrow Distance", 0, 50).step(1);
    controller.onChange(function (value) {
        marginDescriptionVector = value;
    });
    controller = f1_1.add(descriptionKeys, "Description Distance", 0, 50).step(1);
    controller.onChange(function (value) {
        arrowDescriptionMargin = value;
    });
    controller = f1_1.add(descriptionKeys, "Description Size", 0, 50).step(1);

    controller.onChange(function (value) {
        descriptionSize = value;
    });
    controller = f1_1.add(descriptionKeys, "Index Distance", 0, 50).step(1);

    controller.onChange(function (value) {
        indexMargin = value;
    });
    controller = f1_1.add(descriptionKeys, "Index Size", 0, 50).step(1);

    controller.onChange(function (value) {
        indexTextSize = value;
    });
    //Risk Section
    controller = f1_2.add(riskSectionKeys, "Upper Border", 0, 1000).step(1).listen();
    controller.onChange(function (value) {
        upperBorder = value;
        if (lowerBorder > upperBorder)
            lowerBorder = upperBorder;
    });
    controller = f1_2.add(riskSectionKeys, "Lower Border", 0, 1000).step(1).listen();
    controller.onChange(function (value) {
        lowerBorder = value;
        if (upperBorder < lowerBorder)
            upperBorder = lowerBorder;
    });

    controller = f1_2.addColor(riskSectionKeys, 'Upper Section Color');
    controller.onFinishChange(function (value) {
        upperSectionColor = value;
    });

    controller = f1_2.addColor(riskSectionKeys, 'Middle Section Color');
    controller.onFinishChange(function (value) {
        middleSectionColor = value;
    });

    controller = f1_2.addColor(riskSectionKeys, 'Lower Section Color');


    controller.onFinishChange(function (value) {
        lowerSectionColor = value;
    });
    //Risks
    controller = f2.add(riskKeys, "Size", 0, 100).step(1);
    controller.onChange(function (value) {
        riskSize = value;
    });
    controller = f2.addColor(riskKeys, 'Color');
    controller.onFinishChange(function (value) {
        riskColor = value;
    });
    controller = f2.add(riskKeys, "Text Size", 0, 100).step(1);
    controller.onChange(function (value) {
        riskTextSize = value;
    });
    controller = f2.addColor(riskKeys, 'Text Color');


    controller.onFinishChange(function (value) {
        riskTextColor = value;
    });

    this.updateMaxValueBorderControllers = function () {
        for (var i = 0; i < this.gui.__folders.Matrix.__controllers.length; i++) {
            if (this.gui.__folders.Matrix.__controllers[i].property == "Upper Border" || this.gui.__folders.Matrix.__controllers[i].property == "Lower Border")
                this.gui.__folders.Matrix.__controllers[i].max(-1 * yInterceptMax);
        }
    };

    this.updateMinValueLikelihoodController = function (min) {
        for (var i = 0; i < this.gui.__folders.Matrix.__controllers.length; i++) {
            if (this.gui.__folders.Matrix.__controllers[i].property == "Divisions Likelihood")
                this.gui.__folders.Matrix.__controllers[i].min(min);
        }
    };

    this.updateMinValueConsequenceController = function (min) {
        for (var i = 0; i < this.gui.__folders.Matrix.__controllers.length; i++) {
            if (this.gui.__folders.Matrix.__controllers[i].property == "Divisions Consequence")
                this.gui.__folders.Matrix.__controllers[i].min(min);
        }
    };
}