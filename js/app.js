/**
 * Created by sikcd on 03.01.2017.
 */
var app = angular.module("matrix", ["xeditable"]);

app.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
