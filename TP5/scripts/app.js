var app = angular.module('myApp', ['ngRoute']);


// création du routing
app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		controller : 'form1Controller',
		templateUrl: 'views/form.html'
	})
	.when('/form2', {
		controller : 'form2Controller',
		templateUrl: 'views/form.html'
	})
	.when('/form3', {
		controller : 'form3Controller',
		templateUrl: 'views/form.html'
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


/*
	Factory permettant de générer les différents champs d'input présent dans l'app
*/
app.factory('inputFactory', function(regexpFactory, positionFactory, countryFactory){

	// objet contenant l'ensemble des type de champs
	var inputs = {
		// champs qui sont requis
		required : {
			// champs représentant le nom complet
			name : {
				// chemin vers la vue liée
				templateUrl : 'views/fields/text.html',
				// label qui sera affiché dans la vue
				label : 'Name',
				// pattern de vérification 
				pattern : regexpFactory.getRegexps().name,
				// le champs est requis
				required : true,
				// message d'erreur $error.required
				requiredErrorMessage : 'Your name is required',
				// message d'erreur $error.pattern
				patternErrorMessage : 'Letters only !',
				// nom du champs
				inputName : 'name',
			},
			// champs réprésentant le prénom
			firstName : {
				// chemin vers la vue liée
				templateUrl : 'views/fields/text.html',
				// label qui sera affiché dans la vue
				label : 'First Name',
				// pattern de vérification
				pattern : regexpFactory.getRegexps().name,
				// le champs est requis
				required : true,
				// message d'erreur $error.required
				requiredErrorMessage : 'Your first name is required',
				// message d'erreur $error.pattern
				patternErrorMessage : 'Letters only !',
				// nom de l'input
				inputName : 'firstName',
			},
			// champs réprésentat le nom de famille
			lastName : {
				// chemin vers la vue liée
				templateUrl : 'views/fields/text.html',
				// label qui sera affiché dans la vue
				label : 'Last Name',
				// pattern de vérification
				pattern : regexpFactory.getRegexps().name,
				// le champs est requis
				required : true,
				// message d'erreur $eror.required
				requiredErrorMessage : 'Your last name is required',
				// message d'erreur $error.pattern
				patternErrorMessage : 'Letters only !',
				inputName : 'lastName',
			},
			// champs téléphone fixe ou mobile
			tel : {
				templateUrl : 'views/fields/text.html',
				label : 'Tel',
				required : true,
				inputName : 'tel',
				requiredErrorMessage : 'Your telephone number is required',
				patternErrorMessage : 'Format not valid !',
				// function de validation qui sera utilisé à la place du pattern
				validatorFunc : function(obj, val){
					if(!obj || !val)
						return;
					var fixeRegexp = new RegExp(regexpFactory.getRegexps().tel);
					var mobileRegexp = new RegExp(regexpFactory.getRegexps().mobile);
					obj.$setValidity("pattern", fixeRegexp.test(val) || mobileRegexp.test(val));
				}
			},
			// champs représentat le select de pays
			country : {
				templateUrl : 'views/fields/selectWithDefaultOption.html',
				// les options du select
				options : countryFactory.getCountries(),
				inputName : 'country',
				label : 'Country',
				requiredErrorMessage : 'Country is required !',
			},
			// chamsp email
			email : {
				templateUrl :  'views/fields/text.html',
				label : 'Email',
				inputName : 'email',
				pattern : regexpFactory.getRegexps().email,
				required : true,
				requiredErrorMessage : 'Your email is required',
				patternErrorMessage : 'Email format is invalid !',
			},
			// champs mobile
			mobile : {
				templateUrl : 'views/fields/text.html',
				label : 'Mobile',
				pattern : regexpFactory.getRegexps().mobile,
				inputName : 'mobile',
				required : true
			}
		},
		// champs non requis
		notRequired : {
			// select de poste
			position : {
				templateUrl : 'views/fields/select.html',
				// options du select
				options : positionFactory.getPositions(),
				inputName : 'position',
				label : 'Position',
			},
			// champs email
			email : {
				templateUrl :  'views/fields/text.html',
				label : 'Email',
				inputName : 'email',
				pattern : regexpFactory.getRegexps().email,
			},
			// chamsp tel fixe
			fixe : {
				templateUrl : 'views/fields/text.html',
				label : 'Fixe',
				pattern : regexpFactory.getRegexps().tel,
				inputName : 'fixe',
				patternErrorMessage : 'Format not valid !',
			},
		}
	};

	var factory = {};

	factory.getInputs = function(){
		return inputs;
	};

	return factory;
})

// controller du premier formulaire
app.controller('form1Controller',function($scope, inputFactory){
	// object contenant toutes les valeurs du second formulaire
	$scope.formulary = {
		firstName : '',
		lastName : '',
		tel : '',
	};
	// nom du formulaire
	$scope.formName = 'Formulaire 1';
	$scope.inputs = [];

	// on crée l'input prénom
	$scope.firstNameInput = inputFactory.getInputs().required.firstName;
	$scope.firstNameInput.reference = $scope.formulary.firstName;
	$scope.inputs.push($scope.firstNameInput);

	// on crée l'input nom de famille
	$scope.lastNameInput = inputFactory.getInputs().required.lastName;
	$scope.lastNameInput.reference = $scope.formulary.lastName;
	$scope.inputs.push($scope.lastNameInput);

	// on crée l'input telephone fixe ou mobile
	$scope.telInput = inputFactory.getInputs().required.tel;
	$scope.telInput.reference = $scope.formulary.tel;
	$scope.inputs.push($scope.telInput);

	$scope.submitForm = function(isValid){
		if(isValid){
			alert('Submitted');
		}
	};
});

// controller du deuxieme formulaire
app.controller('form2Controller',function($scope, inputFactory){
	// object contenant toutes les valeurs du second formulaire
	$scope.formulary = {
		name : '',
		email : '',
		tel : '',
		mobile : '',
		position : '',
	};
	// nom du formulaire
	$scope.formName = 'Formulaire 2';
	$scope.inputs = [];

	// on crée l'input nom complet
	$scope.nameInput = inputFactory.getInputs().required.name;
	$scope.nameInput.reference = $scope.formulary.name;
	$scope.inputs.push($scope.nameInput);

	// on crée l'input telephone fixe
	$scope.telInput = inputFactory.getInputs().notRequired.fixe;
	$scope.telInput.reference = $scope.formulary.tel;
	$scope.inputs.push($scope.telInput);

	// on crée l'input mobile
	$scope.mobileInput = inputFactory.getInputs().required.mobile;
	$scope.mobileInput.reference = $scope.formulary.mobile;
	$scope.inputs.push($scope.mobileInput);

	// on crée l'input poste
	$scope.positionSelect = inputFactory.getInputs().notRequired.position;
	// on set la valeur sur la première option afin de ne pas crée d'option vide
	$scope.formulary.position = $scope.positionSelect.options[0];
	$scope.positionSelect.reference = $scope.formulary.position;
	$scope.inputs.push($scope.positionSelect);

	// on crée l'input email
	$scope.emailInput = inputFactory.getInputs().required.email;
	$scope.emailInput.reference = $scope.formulary.email;
	$scope.inputs.push($scope.emailInput);

	$scope.submitForm = function(isValid){
		if(isValid){
			alert('Submitted');
		}
	};
});

// controller du troisième formulaire
app.controller('form3Controller',function($scope, inputFactory){
	// object contenant toutes les valeurs du second formulaire
	$scope.formulary = {
		name : '',
		email : '',
		tel : '',
		country : '',
		position : '',
	};

	// nom du formulaire
	$scope.formName = 'Formulaire 3';
	$scope.inputs = [];

	// on crée l'input nom complet
	$scope.nameInput = inputFactory.getInputs().required.name;
	$scope.nameInput.reference = $scope.formulary.name;
	$scope.inputs.push($scope.nameInput);

	// on crée l'input pays
	$scope.countryInput = inputFactory.getInputs().required.country;
	$scope.countryInput.reference = $scope.formulary.country;
	$scope.inputs.push($scope.countryInput);

	// on crée l'input tél fixe
	$scope.telInput = inputFactory.getInputs().notRequired.fixe;
	$scope.telInput.reference = $scope.formulary.tel;
	$scope.inputs.push($scope.telInput);

	// on crée l'input poste
	$scope.positionSelect = inputFactory.getInputs().notRequired.position;
	// on set la valeur sur la première option afin de ne pas crée d'option vide
	$scope.formulary.position = $scope.positionSelect.options[0];
	$scope.positionSelect.reference = $scope.formulary.position;
	$scope.inputs.push($scope.positionSelect);

	// on crée l'input email
	$scope.emailInput = inputFactory.getInputs().required.email;
	$scope.emailInput.reference = $scope.formulary.email;
	$scope.inputs.push($scope.emailInput);

	$scope.submitForm = function(isValid){
		if(isValid){
			alert('Submitted');
		}
	};
});