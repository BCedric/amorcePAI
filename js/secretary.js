require('./secretary.css');

var angular         = require( "angular")
  , angularMaterial    = require( "angular-material" )
  ;
require( "angular-material/angular-material.css" );

var cabinetModule = angular.module( "cabinet", [ angularMaterial ] );
require( "./cabinetMedical.js" )(cabinetModule);


function displayForm(){
  console.log("coucou");
    var aP = document.getElementById("addPatient");
    aP.style.display = "block";
}
