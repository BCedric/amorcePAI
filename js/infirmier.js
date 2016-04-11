var template = require( "./infirmier.html" );
require( "./infirmier.css" );

module.exports = function(mod) {
    var proxyNF = require("./NF.js")(mod);

    var controller = function() {
        console.log(this.data);
    }
    controller.$inject = [ proxyNF ]; // Injection de dépendances

    mod.component( "infirmier", {
        template    : template,
        bindings    : {
            data    : '='
        },
        controller  : controller
    });
};
