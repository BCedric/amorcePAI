var template = require( "./patient.html" );
require( "./patient.css" );

var form = require("./formPatient.html")

module.exports = function(mod) {
    var proxyNF = require("./NF.js")(mod);

    var controller = function(proxyNF) {

        var ctrl = this;

        ctrl.patient = {
          "patientName" : "",
          "patientForname" : "",
          "patientSex" : "",
          "birthday" : "",
          "patientNumber" : "",
          "patientFloor" : "",
          "patientStreet" : "",
          "postalCode" : "",
          "patientCity" : ""
        };

        ctrl.ajouterPatient = function(){
          proxyNF.addPatient(ctrl.patient);
        };
    };
    controller.$inject = [ proxyNF ]; // Injection de dépendances

    mod.component( "patient", {
        template    : template,
        bindings    : {
            data    : '='
        },
        controller  : controller
    });

    mod.component("formPatient", {
        template    : form,
        bindings    : {},
        controller  : controller
    });
};
