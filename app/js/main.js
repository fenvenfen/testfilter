var cropperApp = angular.module('svApp', [
    'ngRoute',
    'filterDirective',
    'cardDirective',
    'dataService',
    'pipeModule',
    'filterModule'
])

cropperApp.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when("/testfilter", {
        templateUrl : "testfilter/app/layout/home.html"
    })

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true)
    
});
// Main Controller
cropperApp.controller('MainCtrl', ['$scope', function ($scope) {
    console.log("MAIN CONTORLLER")
}]);
