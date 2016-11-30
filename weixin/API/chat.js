wechat.factory('chat',[function(chat){
	var chatList=[{id:100,name:'zhangsan',lastMessage:'张三'},{id:101,name:'lisi',lastMessage:'李四'},{id:102,name:'wangwu',lastMessage:'王五'}]
	return{
		getAll:function(){
			return chatList;
		},
		getById:function(id){
			for(var i=0;i<chatList.length;i++){
				if(id===chatList[i].id){
					return chatList[i];
				}
			}
			return{};
		}
	}
}]);