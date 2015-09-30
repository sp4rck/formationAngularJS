var app = angular.module('myApp', ['ngRoute']);


// création du routing
app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		controller : 'form1Controller',
		templateUrl: 'views/form1.html'
	})
	.when('/form2', {
		controller : 'form2Controller',
		templateUrl: 'views/form2.html'
	})
	.when('/form3', {
		controller : 'form3Controller',
		templateUrl: 'views/form3.html'
	})
	.when('/404', {
		templateUrl: 'views/404.html'
	})
	.otherwise({redirectTo : '/404'})
});

app.factory('regexpFactory',function(){

	var regexps = {
		tel : /^$|^0[1234589]\d{8}$/i,
		mobile : /^$|^0[67]\d{8}$/i,
		name : /^[a-zA-Z ]+$/,
		email : /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	};

	var factory = {};

	factory.getRegexps = function(){ return regexps;};

	return factory;
});

app.factory('positionFactory', function(){
	var positions = [
	{
		id : 1,
		label : 'Dev'
	},
	{
		id : 2,
		label : 'C.P.'
	},
	{
		id : 3,
		label : 'MDA'
	}
	];

	var factory = {};

	factory.getPositions = function(){
		return positions;
	}	

	return factory;
});

app.factory('countryFactory', function(){
	var countries = [
	{
		id : 1,
		label : 'France'
	},
	{
		id : 2,
		label : 'United Kingdom'
	},
	{
		id : 3,
		label : 'Deutshland'
	}
	];

	var factory = {};

	factory.getCountries = function(){
		return countries;
	}	

	return factory;
});

app.controller('form1Controller',function($scope, regexpFactory){
	$scope.formulary = {
		firstName : '',
		lastName : '',
		email : '',
		message : '',
		tel : '',
		mobile : '',
	};

	$scope.regexp = regexpFactory.getRegexps();

	$scope.submitForm = function(isValid){
		if(isValid){
			alert('Submitted');
		}
	};
});

app.controller('form2Controller',function($scope, positionFactory, regexpFactory){
	$scope.formulary = {
		firstName : '',
		lastName : '',
		email : '',
		message : '',
		tel : '',
		mobile : '',
	};



	$scope.regexp = regexpFactory.getRegexps();

	$scope.submitForm = function(isValid){
		if(isValid){
			alert('Submitted');
		}
	};

	$scope.selectPositionOptions = positionFactory.getPositions();


	$scope.selectedPositionOption = $scope.selectPositionOptions[0];
});

app.controller('form3Controller',function($scope, positionFactory, countryFactory, regexpFactory){
	$scope.formulary = {
		firstName : '',
		lastName : '',
		email : '',
		message : '',
		tel : '',
		mobile : '',
	};


	$scope.regexp = regexpFactory.getRegexps();

	$scope.submitForm = function(isValid){
		if(isValid){
			alert('Submitted');
		}
	};

	$scope.selectPositionOptions = positionFactory.getPositions();
	$scope.selectedPositionOption = $scope.selectPositionOptions[0];

	$scope.selectCountrieOptions = countryFactory.getCountries();
});