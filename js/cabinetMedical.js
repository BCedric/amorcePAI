var template = require( "./cabinetMedical.html" );
require( "./cabinetMedical.css" );

module.exports = function(mod) {
    var proxyNF = require("./NF.js")(mod);
    require("./infirmier.js")(mod);
    var controller = function( proxyNF ) {
        var ctrl = this;
        ctrl.data = {};
        proxyNF.getData(this.src).then( function(obj) {
          ctrl.data = obj;
        });
    }
    controller.$inject = [ proxyNF ]; // Injection de dépendances

    mod.component( "cabinetMedical", {
        template    : template,
        bindings    : {
            titre   : "@",
            src     : "@"
        },
        controller    : controller
    });
};
