function MainCtrl($scope, $http) {

	$scope.data = {
		target: {

		},
		targetList: []
	};

	$scope.func = {

		add: function() {

			$http.post('/api/target', $scope.data.target).success(function(data) {

				//console.log(data);
				//$scope.data.targetList = data.result.targetList;
			});

		},
		remove: function(target) {

			$http.delete('/api/target/' + target._id).success(function(data) {

				//console.log(data);
				//$scope.data.targetList = data.result.targetList;
			});			

			//console.log(target);
			//alert(JSON.stringify(target));

			//db.things.remove({_id: ObjectId("4f6f244f6f35438788aa138f")});
		}

	};




	$http.jsonp('/api/target/getList.json?callback=JSON_CALLBACK').success(function(data) {

		console.log(data);
		$scope.data.targetList = data.result.targetList;
	});
	
}