// Local Development Configuration

let polyfills = [],
    lang = ( document.documentElement.lang ) ? document.documentElement.lang : "en";

requirejs.config({
    config: {
        i18n: {
            locale: lang
        }
    }
});

// Start the main app logic.
requirejs(['dom/stylesheet'], function( Stylesheet  ) {

    let insertListener = function( event ) {
        if (
            event.animationName === "nodeInserted" &&
            event.target.tagName.startsWith('AGAMA-')
        ) {
            //let node = Object.assign( event.target, { i18n: i8n} ),
            let node = event.target,
                component = node.getAttribute('is');

            require( [ "/doc/" + id + "/" + id ], function( element ) {

                // Call the init() function when defined (like in wb-xtemplate)
                // # wb-carousel.js use the global object customElements.define as per the living standard. So it don't need this init call.
                //if ( element && element.init ) {
                //    element.init( node );
                // }

            }) ;
        }

    }

    document.addEventListener( "animationstart", insertListener, false ) ; // standard+ firefox
    document.addEventListener( "MSAnimationStart", insertListener, false ) ; // IE
    document.addEventListener( "webkitAnimationStart", insertListener, false ) ; // Chrome + Safari

    // Add the observer event binding
    document.head.appendChild(
        Stylesheet.css("@keyframes nodeInserted {\nfrom { opacity: 0.99; }\nto { opacity: 1; }\n}\n\n[v] {animation-duration: 0.001s;animation-name: nodeInserted;}" )
    );

    //console.log( "WET 5 lives.. greeting >> " + i8n.greeting );
});
requirejs([ 'i18n!nls/terms'], function   ( terms ) {
       console.log(terms.greeting);
    });