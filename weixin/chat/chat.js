wechat.controller("chatCtrl",["$scope","chat",function($scope,chat){
	console.log(chat);
	$scope.chatList=chat.getAll();
}])