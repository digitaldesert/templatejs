/**
 * Stylesheet util class
 * @author Government of Canada
 * @version 1.0
 */

define( [], function() {
    "use strict";

    return {
        css: function (css) {
            return document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`)
        }
    };
} );