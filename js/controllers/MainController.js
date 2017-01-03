/**
 * Created by sikcd on 03.01.2017.
 */

app.controller('MainController', function($scope, $filter) {
    risksInput = [
        {
            nr: 1,
            likelihood: 1,
            consequence: 1,
            isNew: false
        },
        {
            nr: 2,
            likelihood: 1,
            consequence: 1,
            isNew: false
        },
        {
            nr: 3,
            likelihood: 3,
            consequence: 1,
            isNew: false
        },
        {
            nr: 4,
            likelihood: 3,
            consequence: 3,
            isNew: false
        },
        {
            nr: 5,
            likelihood: 3,
            consequence: 1,
            isNew: false
        },
        {
            nr: 6,
            likelihood: 2,
            consequence: 2,
            isNew: false
        },
        {
            nr: 7,
            likelihood: 3,
            consequence: 1,
            isNew: false
        }

    ];

    $scope.risks = risksInput;


    // filter users to show
    $scope.filterRisks = function(risk) {
        return risk.isDeleted !== true;
    };

    // mark user as deleted
    $scope.deleteRisk = function(nr) {
        var filtered = $filter('filter')($scope.risks, {nr: nr});
        if (filtered.length) {
            filtered[0].isDeleted = true;
        }
    };

    // add user
    $scope.addUser = function() {
        $scope.risks.push({
            nr: $scope.risks.length+1,
            likelihood: 1,
            consequence: 1,
            isNew: true
        });
    };

    // cancel all changes
    $scope.cancel = function() {
        for (var i = $scope.risks.length; i--;) {
            var risk = $scope.risks[i];
            // undelete
            if (risk.isDeleted) {
                delete risk.isDeleted;
            }
            // remove new
            if (risk.isNew) {
                $scope.risks.pop(i);
            }
        };
    };

    // save edits
    $scope.saveTable = function() {
        var results = [];
        for (var i = $scope.risks.length; i--;) {
            var risk = $scope.risks[i];
            // actually delete user
            if (risk.isDeleted) {
                $scope.risks.pop(i);
            }
            // mark as not new
            if (risk.isNew) {
                risk.isNew = false;
            }
            setMinMatrixSize();
        }
    };
});