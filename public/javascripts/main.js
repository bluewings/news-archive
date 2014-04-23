function MainCtrl($scope, $http) {

    var SUCCESS = 200;

    $scope.data = {
        target: null,
        targetList: [],
        devices: []
    };

    $scope.func = {
        select: function (target) {

            $scope.data.target = JSON.parse(JSON.stringify(target));
        },
        clear: function () {

            $scope.data.target = null;
        },
        upsert: function () {

            if ($scope.data.target._id) {
                $scope.func.modify();
            } else {
                $scope.func.add();
            }
        },
        add: function () {

            $http.post('/api/target/', $scope.data.target).success(function (data) {

                if (data.code == SUCCESS) {
                    $scope.func.clear();
                    $scope.func.refresh();
                } else {
                    alert(data.message);
                }
            });
        },
        modify: function () {

            $http.post('/api/target/' + $scope.data.target._id, $scope.data.target).success(function (data) {

                if (data.code == SUCCESS) {
                    $scope.func.clear();
                    $scope.func.refresh();
                } else {
                    alert(data.message);
                }
            });
        },
        remove: function () {

            $http.delete('/api/target/' + $scope.data.target._id).success(function (data) {

                if (data.code == SUCCESS) {
                    $scope.func.clear();
                    $scope.func.refresh();
                } else {
                    alert(data.message);
                }
            });
        },
        refresh: function () {

            $http.jsonp('/api/target/?callback=JSON_CALLBACK').success(function (data) {

                if (data.code == SUCCESS) {
                    $scope.data.targetList = data.result.targetList;
                } else {
                    alert(data.message);
                }
            });
        }
    };

    $http.jsonp('/api/misc/phones/?callback=JSON_CALLBACK').success(function (data) {

        if (data.code == SUCCESS) {
            $scope.data.devices = data.result.phones;
        } else {
            alert(data.message);
        }
    });

    $scope.func.refresh();
}