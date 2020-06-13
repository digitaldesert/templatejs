define(()=>{

        let empty=(function(){
            var exceptionKeys = [
                "eval", "Object", //need exceptions for these else error. (ie, 'Exception: redefining eval is deprecated')
                "Number", "String", "Boolean", "RegExp", "JSON", "Date", "Array", "Math",
                "this",
                "strEval"
            ];
            let forbiddenKeys=["window","self"];

            let forbidden=Object.create(null);

            [window,this,self].forEach(function(obj){
                Object.getOwnPropertyNames(obj).forEach(function(key){
                    forbidden[key]=null;
                });

                //just making sure we get everything
                Object.keys(obj).forEach(function(key){
                    forbidden[key]=null;
                });

                for (let key in obj){
                    forbidden[key]=null;
                }
            });

            forbiddenKeys.forEach(function(key){
                forbidden[key]=null;
            });
            exceptionKeys.forEach(function(key){
                delete forbidden[key];
            });

            Object.freeze(forbidden);

            var empty=Object.create(forbidden);

            Object.freeze(empty);

            return empty;
        })();

        return {
            eval : (strEval) => {
                return ( ( empty, strEval ) => {
                    try {
                        with( empty ) {
                            return eval("(" + strEval + ")");
                        }
                    } catch(err){
                        return err.message;
                    }
                }).call( empty, empty, strEval )
            }
        }
});