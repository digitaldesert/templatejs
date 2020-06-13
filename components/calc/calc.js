

define(['/core/dom/element.js', '/core/data/store.js'], (Element, Datastore) => {

    return {
        hydrate: ( element ) => {
            let id = Element.id( element ),
                data = Element.data( element );
            data.id = id;
            console.log(data);
            Datastore.insert({...data});

            data.id = Element.id( element );
            console.log(data);
            Datastore.insert({...data});

            console.log( Datastore().select("id") );
            console.log( Datastore({id:id}).first());
        }
    }
});