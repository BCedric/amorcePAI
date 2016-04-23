var template = require( "./infirmier.html" );
require( "./infirmier.css" );

module.exports = function(mod) {
    require("./patient.js")(mod);

    var controller = function() {
        var ctrl = this;

        ctrl.updateData = function () {
            ctrl.onUpdate();
        }
    }


    mod.component( "infirmier", {
        template    : template,
        bindings    : {
            data    : '=',
            onUpdate  : '&'
        },
        controller  : controller
    });
};
