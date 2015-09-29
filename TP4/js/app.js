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

	$scope.submitForm = function(isValid){
		if(isValid){
			alert('Submitted');
		}
	}
});