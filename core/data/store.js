/**
 datastore
 @desc a singleton data object for the templatejs framework
 **/

define(['/core/data/drivers/taffy.js'],function (Database ) {

    let instance = null;

    return (() => {
        // summary:
        //      Gets an instance of the singleton. It is better to use
        if (instance === null) {
            instance = Database();
        }
        return instance;
    })();

});