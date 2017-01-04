$(testFunc = function () {
    $("#dialog").dialog({
        autoOpen: false,
        height: "auto",
        width: 600,
        show: {
            effect: "blind",
            duration: 225
        },
        hide: {
            effect: "blind",
            duration: 195
        },
        modal: true,
        buttons: {
            close: function () {
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            console.log("OuterClose");
            //angular.element($('#mainController')).scope().cancel();
        }
    });
});

this.editRisks = function () {
    $("#dialog").dialog("open");
};











