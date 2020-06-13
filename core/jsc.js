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

        if ( event.animationName === "nodeInserted" )
        {

            if ( event.target.tagName.startsWith('JS-') )
            {
                //let node = Object.assign( event.target, { i18n: i8n} ),
                let node = event.target,
                    component = node.getAttribute('is');

                return require( [ `/components/${component}/${component}.js` ], function( Component ) {
                    Component.hydrate( node );
                }) ;
            }

            // Helpers
            if ( event.target.hasAttribute('data-@jsc') )
            {
                let node = event.target,
                    helper = node.getAttribute('data-@jsc').split(':');

                return require( [ `directives/${helper[0]}/${helper[0]}` ], function( Helper ) {
                    Helper.assist( helper, node );
                })
            }

        }

    }

    document.addEventListener( "animationstart", insertListener, false ) ; // standard+ firefox
    document.addEventListener( "MSAnimationStart", insertListener, false ) ; // IE
    document.addEventListener( "webkitAnimationStart", insertListener, false ) ; // Chrome + Safari

    // Add the observer event binding
   // document.head.appendChild(
    Stylesheet.css("@keyframes nodeInserted {\nfrom { opacity: 0.99; }\nto { opacity: 1; }\n}\n\njs-c,[data-\\@jsc] {animation-duration: 0.001s;animation-name: nodeInserted;}" )
   // );

    //console.log( "WET 5 lives.. greeting >> " + i8n.greeting );
});
