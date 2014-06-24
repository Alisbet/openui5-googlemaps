sap.ui.define(['jquery.sap.global', 'sap/ui/core/Core', 'sap/ui/core/library'],
    function(jQuery) {

        "use strict";
        (function() {

            var sPath = jQuery.sap.getResourcePath("openui5/googlemaps/loadScripts");
            jQuery.sap.registerResourcePath('google.maps', sPath);

            // delegate further initialization of this library to the Core
            sap.ui.getCore().initLibrary({
                name: "openui5.googlemaps",
                dependencies: ["sap.ui.core"],
                types: [],
                interfaces: [],
                controls: [
                    "openui5.googlemaps.Map",
                    "openui5.googlemaps.Marker",
                    "openui5.googlemaps.Polyline",
                    "openui5.googlemaps.Polygon"
                ],
                elements: [],
                version: "0.0.0"
            });
        })();
        return true;
    }, true);