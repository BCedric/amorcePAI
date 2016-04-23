var template = require( "./patient.html" );
require( "./patient.css" );

var form = require("./formPatient.html")
var patientNonAffecte = require("./patientNonAffecte.html")

module.exports = function(mod) {
    var proxyNF = require("./NF.js")(mod);

    var controller = function(proxyNF) {

        var ctrl = this;

        ctrl.listInf = {};

        proxyNF.getData("../data/cabinetInfirmier.xml").then( function(obj) {
          ctrl.listInf = obj.infirmiers;
        });

        ctrl.patient = {
          "patientName" : "",
          "patientForname" : "",
          "patientSex" : "",
          "patientBirthday" : "",
          "patientNumber" : "",
          "patientFloor" : "",
          "patientStreet" : "",
          "postalCode" : "",
          "patientCity" : "",
          "infirmier" : ""
        };

        ctrl.update = function () {
            ctrl.onUpdate();
        }


        ctrl.ajouterPatient = function(){
          proxyNF.addPatient(ctrl.patient);
          console.log(ctrl.patient.patientNumber);
          ctrl.affecterPatient(ctrl.patient.infirmier, ctrl.patient.patientNumber)

        };

        ctrl.affecterPatient = function(){

          console.log(ctrl.patient);
          if(ctrl.patient.infirmier != "") {
            console.log("affectation");
            console.log(ctrl.patient.patientNumber);
            proxyNF.affectation(ctrl.patient.infirmier, ctrl.patient.patientNumber);
          }
        };

        ctrl.addPatientNum = function(value){
          ctrl.patient.patientNumber = value;
        }

    };
    controller.$inject = [ proxyNF ]; // Injection de dépendances

    mod.component( "patient", {
        template    : template,
        bindings    : {
            data    : '=',
            onUpdate  : '&'
        },
        controller  : controller
    });

    mod.component( "patientNonAffecte", {
        template    : patientNonAffecte,
        bindings    : {
            data    : '=',
            onUpdate  : '&'
        },
        controller  : controller
    });

    mod.component("formPatient", {
        template    : form,
        bindings    : {
          onUpdate  : '&'
        },
        controller  : controller
    });
};
