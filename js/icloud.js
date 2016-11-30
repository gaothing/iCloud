$(function() {
	var app = angular.module("icloud", []);
	app.controller("mainCtrl", ["$scope", function($scope) {
		$scope.color = ["blue", "green", "yellow", "brown", "pink", "orange", "purple"];
		if(localStorage.reminder) {
			$scope.lists = JSON.parse(localStorage.reminder)
		} else {
			$scope.lists = []
		}
		$scope.save2local = function() {
				localStorage.reminder = JSON.stringify($scope.lists)
			}
//		$scope.lists = [
//		{id:1001,
//			name:"新列表1",
//			theme:"red",
//			todos:[
//			{id:101,
//			name:"nin",
//			color:"red",
//			state:0
//			}]
//		}
//		]
//		console.log($scope.lists[cu].todos.name)
		$scope.cu = 0;
		//		点击添加
		$scope.additem = function() {

			var len = $scope.lists.length
			var index = len % 7;
			var m = {
				id: findId() + 1,
				name: "新列表" + (len + 1),
				theme: $scope.color[index],
				todos:[]
			}
			$scope.lists.push(m)
		}
		function findId() {
			var max = -Infinity;
			for(var i = 0; i < $scope.lists.length; i++) {
				var c = $scope.lists[i];
				if(c.id > max) {
					max = c.id
				}
			}
			return(max === -Infinity) ? 1 : max;
		}
		
		///////////////////
			function maxid(){
				var max=-Infinity;
				var o=$scope.lists[$scope.cu].todos
				for(var i=0;i<o.length;i++){
					var v=$scope.lists[$scope.cu].todos[i];
					if(v.id>max){
						max=v.id
					}
				}
				return (max===-Infinity) ? 0:max;
			}
		////////////
//		添加未完成
		$scope.addlis=function(){
				var v={
					id: maxid()+1,
					name:$scope.value,
					state:0
				}			
				$scope.lists[$scope.cu].todos.push(v)
				$scope.save2local();
				$scope.value=''
			}
//		删除已完成
		$scope.delet=function(e,i){
			e.preventDefault()
                e.stopPropagation()
			var newarr=[];
			var newid=$scope.lists[$scope.cu].todos[i].id;
		
			$scope.lists[$scope.cu].todos.forEach(function(v,i){
				var id=v.id;
				
				if(id!==newid){
					newarr.push(v)
				}else{
					return
				}
			})
			$scope.lists[$scope.cu].todos=newarr;
		}
		$scope.hasOver=function(){
				var x=0;
				$scope.lists[$scope.cu].todos.forEach(function(v,i){
					if(v.state===1){
						x++;
					}
					
				})
				return x;
			}
		$scope.unhasOver=function(){
				var y=0;
				$scope.lists[$scope.cu].todos.forEach(function(v,i){
					if(v.state===0){
						y++;
					}
					
				})
				return y;
			}

	}]);

	//	点击背景变化
	app.directive("myUl", [function() {
			return {
				restrict: "A",
				replace: true,
				template: '<div class="things"><ul ng-transclude></></div>',
				transclude: true,
				link: function($scope, el) {
					$(el).on("click", "li", function() {
						$(el).find("li").css("background", "#383836").removeClass("acctive")
						$(this).css("background", "#1A1A1A").addClass("acctive")
						var self = this;
						$scope.$apply(function() {
//						$scope.lists = $scope.lists.filter(function (v, i) {
//                      return v.id !== id
//                  })
							$scope.cu = $(self).index()
						})
					})
					$(document).on("keyup", ":input", false)
					$(el).on("keyup", "input", false);
					$(document).on("keyup", function(e) {

						if(e.keyCode === 8) {
							var index = $(".acctive").index();
							$scope.$apply(function() {

								if(index == -1) {
									return

								} else {
									if($scope.cu == 1) {
										return
									} else {
										$scope.lists.splice(index, 1)
										$scope.cu = $scope.cu - 1
										$(el).find("li").css("background", "#383836").removeClass("acctive")
										$scope.save2local()
									}

								}

							})
						}
					})

				}
			}
		}])

		////////////////////
	$(".left").on("click", false)
	$(".over").on("click", function() {
			var val = $(".tan-box").find("input").val()
			console.log(val)
			$('.acctive .text').text(val)

		})
		//	right
	app.directive("myset", [function() {
		return {
			restrict: "A",
			replace: true,
			template: '<div class="color"><div ng-transclude></div></div>',
			transclude: true,
			link: function($scope, el) {
				var obj = $("#box");
				$(el).on("click", function() {
					obj.toggleClass("active")
					$("#box").focus()
					return false;
				})
				obj.on("click", false)
				$(document).on("click", function() {
					obj.removeClass("active");
				})
			}
		}
	}])
	$(".choose").on("click", false)
	$(".choose").on("click", function() {
		$(".color").toggle()
	})
	$(".color").on("click", false)
	$(document).on("click", function() {
			$(".color").hide()
			
				//		return false
		})
	$(".cancels").on("click",function(){
			$(".color").hide()
	})
		//完成
	$(".has").on("click", function() {
		$(this).find(".san").toggleClass("san-act")
		$(".finish").children().toggle()
	})
	$(".nohas").on("click", function() {
		$(this).find(".san").toggleClass("san-act")
		$(".unfinish").children().toggle()
	})
	$(".addnewpro").focusin(function(){
		$(this).prev().css("display","none")
//		$(this).next().css("display","block")
	})
	$(".addnewpro").focusout(function(){
		$(this).prev().css("display","block")
//		$(this).next().css("display","none")
	})
	

})