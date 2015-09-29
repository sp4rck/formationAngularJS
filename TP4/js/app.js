var app = angular.module('myApp', ['ngRoute']);


// création du routing
app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		controller : 'friendsController',
		templateUrl: 'templates/friends.html'
	})
	.when('/contact',{
		controller : 'contactController',
		templateUrl: 'templates/contact.html'
	})
	.otherwise({redirectTo : '/'})
});

// création d'une factory, ici l'exemple n'est pas très pertinent mais cela est considéré comme une bonne pratique
app.factory('friendsFactory', function(){

	var friends = [{name:'John', phone:'555-1276'},
	{name:'Mary', phone:'800-BIG-MARY'},
	{name:'Mike', phone:'555-4321'},
	{name:'Adam', phone:'555-5678'},
	{name:'Julie', phone:'555-8765'},
	{name:'Juliette', phone:'555-5678'}];

	var factory = {};

	factory.getFriends = function(){
		return friends;
	};

	factory.addFriend = function(name, phone){
		friends.push({
			name : name,
			phone : phone
		});
	};

	return factory;
});

app.controller('friendsController', function($scope, friendsFactory){
	$scope.friends = [];


	$scope.regexp = {
		phone : /^0\d{9}$/i,
		name : /^[a-zA-Z ]+$/,
	};

	$scope.friend = {
		name : '',
		phone : '',
	};

	function init(){
		$scope.friends = friendsFactory.getFriends();
	}

	$scope.addFriend = function(isValid){
		if(isValid){
			friendsFactory.addFriend($scope.friend.name, $scope.friend.phone);
			$scope.friend.name = '';
			$scope.friend.phone = '';
			// $scope.newFriendForm.phone.$dirty = false;
			// $scope.newFriendForm.name.$dirty = false;
			$scope.newFriendForm.$setPristine(true);
		}
	};

	init();
});

app.controller('contactController',function($scope){
	$scope.formulary = {
		firstName : '',
		lastName : '',
		email : '',
		message : '',
		tel : '',
		mobile : '',
	};

	$scope.regexp = {
		tel : /^$|^0[1234589]\d{8}$/i,
		mobile : /^$|^0[67]\d{8}$/i,
		name : /^[a-zA-Z ]+$/,
		email : /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	};

	$scope.submitForm = function(isValid){
		if(isValid){
			alert('Submitted');
		}
	};
});