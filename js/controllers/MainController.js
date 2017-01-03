/**
 * Created by sikcd on 03.01.2017.
 */

app.controller('MainController', function($scope, $filter, $http, $q) {
    var editListRisks = risksInput;
    $scope.risks = editListRisks;
    $scope.users = [
        {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
        {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
        {id: 3, name: 'awesome user3', status: 2, group: null}
    ];

    $scope.statuses = [
        {value: 1, text: 'status1'},
        {value: 2, text: 'status2'},
        {value: 3, text: 'status3'},
        {value: 4, text: 'status4'}
    ];

    $scope.groups = [];
    $scope.loadGroups = function() {
        return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
                $scope.groups = data;
            });
    };

    $scope.showGroup = function(user) {
        if(user.group && $scope.groups.length) {
            var selected = $filter('filter')($scope.groups, {id: user.group});
            return selected.length ? selected[0].text : 'Not set';
        } else {
            return user.groupName || 'Not set';
        }
    };

    $scope.showStatus = function(user) {
        var selected = [];
        if(user.status) {
            selected = $filter('filter')($scope.statuses, {value: user.status});
        }
        return selected.length ? selected[0].text : 'Not set';
    };

    $scope.checkName = function(data, id) {
        if (id === 2 && data !== 'awesome') {
            return "Username 2 should be `awesome`";
        }
    };

    // filter users to show
    $scope.filterUser = function(user) {
        return user.isDeleted !== true;
    };

    // mark user as deleted
    $scope.deleteRisk = function(nr) {
        var filtered = $filter('filter')($scope.risks, {nr: nr});
        if (filtered.length) {
            console.log("Testtest", filtered[0]);
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

            // // send on server
            // results.push($http.post('/saveUser', user));
            console.log("after delete:", $scope.risks);
        }

        return $q.all(results);
    };
});