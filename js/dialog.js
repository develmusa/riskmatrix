/**
 * Created by sikcd on 03.01.2017.
 */



$(testFunc = function() {
    $( "#dialog" ).dialog({
        autoOpen: true,
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
            "Save": function () {
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
} );

this.editRisks = function() {
    $( "#dialog" ).dialog( "open" );
};










