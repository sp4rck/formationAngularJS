var app = angular.module('myApp', ['ngRoute']);

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

app.controller('friendsController', function($scope){
	$scope.friends = [{name:'John', phone:'555-1276'},
	{name:'Mary', phone:'800-BIG-MARY'},
	{name:'Mike', phone:'555-4321'},
	{name:'Adam', phone:'555-5678'},
	{name:'Julie', phone:'555-8765'},
	{name:'Juliette', phone:'555-5678'}];
});

app.controller('contactController',function($scope){
	$scope.formulary = {
		firstName : '',
		lastName : '',
		email : '',
		message : '',
	}

	$scope.regexp = {
		tel : /^$|^0[1234589]\d{8}$/i,
		mobile : /^$|^0[67]\d{8}$/i,
		name : /^[a-zA-Z ]+$/,
		email : /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	}

	$scope.submitForm = function(isValid){
		if(isValid){
			alert('Submitted');
		}
	}
});