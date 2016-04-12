var template = require( "./patient.html" );
require( "./patient.css" );

module.exports = function(mod) {
    var proxyNF = require("./NF.js")(mod);

    var controller = function() {
        var ctrl = this;
    }
    controller.$inject = [ proxyNF ]; // Injection de dépendances

    mod.component( "patient", {
        template    : template,
        bindings    : {
            data    : '='
        },
        controller  : controller
    });
};
