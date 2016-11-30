wechat.controller("boxCtrl",["$scope","$routeParams","chat",function($scope,$routeParams,chat){
	var id=parseInt($routeParams.id);
	$scope.cur=chat.getById(id);
}])