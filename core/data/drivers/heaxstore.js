/**
 * Hexastore Driver
 * @desc: A fast, pure javascript triple store implementation, also useful as a graph database.
 * @credits: https://github.com/crubier/Hexastore
 */

(function ( global, factory ){
    // CommonJS
    if ( typeof exports === 'object' ) {
        exports.taffy = factory();

        // AMD
    } else if ( typeof define === 'function' && define.amd ) {
        define( factory );

        // Browser globals
    } else {
        global.TAFFY = factory();
    }
}( this, function() {
    'use strict';

    function Hexastore() {
        this.spo = {};
        this.sop = {};
        this.pso = {};
        this.pos = {};
        this.osp = {};
        this.ops = {};
    }

    // Export a database to import with import
    Hexastore.prototype.exportJSON = function (dbname) {
        return JSON.stringify(this.spo);
    };

    // Import a database previously exported with export
    Hexastore.prototype.importJSON = function (json) {
        try {
            this.addSPO(JSON.parse(json));
        } catch (err) {
            console.log(err.message);
        }
    };


    // get the size of the hexastore
    Hexastore.prototype.size = function () {
        let count = 0;
        for (let s in this.spo) {
            if (this.spo.hasOwnProperty(s)) {
                for (let p in this.spo[s]) {
                    if (this.spo[s].hasOwnProperty(p)) {
                        for (let o in this.spo[s][p]) {
                            if (this.spo[s][p].hasOwnProperty(o)) {
                                if (this.spo[s][p][o] !== undefined) {
                                    count++;
                                }
                            }
                        }
                    }
                }
            }
        }
        return count;
    };

    // Add a single triple to the store
    Hexastore.prototype.put = function (element) {
        let s = element[0];
        let p = element[1];
        let o = element[2];
        let v = element[3] ? element[3] : true;

        if (this.spo[s] === undefined)
            this.spo[s] = {};
        if (this.spo[s][p] === undefined)
            this.spo[s][p] = {};
        this.spo[s][p][o] = v;

        if (this.sop[s] === undefined)
            this.sop[s] = {};
        if (this.sop[s][o] === undefined)
            this.sop[s][o] = {};
        this.sop[s][o][p] = v;

        if (this.pso[p] === undefined)
            this.pso[p] = {};
        if (this.pso[p][s] === undefined)
            this.pso[p][s] = {};
        this.pso[p][s][o] = v;

        if (this.pos[p] === undefined)
            this.pos[p] = {};
        if (this.pos[p][o] === undefined)
            this.pos[p][o] = {};
        this.pos[p][o][s] = v;

        if (this.osp[o] === undefined)
            this.osp[o] = {};
        if (this.osp[o][s] === undefined)
            this.osp[o][s] = {};
        this.osp[o][s][p] = v;

        if (this.ops[o] === undefined)
            this.ops[o] = {};
        if (this.ops[o][p] === undefined)
            this.ops[o][p] = {};
        this.ops[o][p][s] = v;
    };

    Hexastore.prototype.putAll = function (elements) {
        for (let i = 0; i < elements.length; i++) {
            this.put(elements[i]);
        }
    };

    // Clear all database
    Hexastore.prototype.clear = function () {
        this.spo = {};
        this.sop = {};
        this.pso = {};
        this.pos = {};
        this.osp = {};
        this.ops = {};
    };

    // Add triples to the store, with input data nested as subjects containing predicates containing objects containing values
    Hexastore.prototype.addSPO = function (element) {
        let subj = element;
        for (let subject in subj) {
            let pred = subj[subject];
            for (let predicate in pred) {
                let obj = pred[predicate];
                for (let object in obj) {
                    let val = obj[object];
                    this.put([subject, predicate, object, val]);
                }
            }
        }
    };


    Hexastore.prototype.getSPO = function () {
        return this.spo;
    };

    // Add triples to the store, with input data nested as subjects containing objects containing predicates containing values
    Hexastore.prototype.addSOP = function (element) {
        let subj = element;
        for (let subject in subj) {
            let obj = subj[subject];
            for (let object in obj) {
                let pred = obj[object];
                for (let predicate in pred) {
                    let val = pred[predicate];
                    this.put([subject, predicate, object, val]);
                }
            }
        }
    };


    Hexastore.prototype.getSOP = function () {
        return this.sop;
    };

    // Add triples to the store, with input data nested as predicate containing subjects containing objects containing values
    Hexastore.prototype.addPSO = function (element) {
        let pred = element;
        for (let predicate in pred) {
            let subj = pred[predicate];
            for (let subject in subj) {
                let obj = subj[subject];
                for (let object in obj) {
                    let val = obj[object];
                    this.put([subject, predicate, object, val]);
                }
            }
        }
    };


    Hexastore.prototype.getPSO = function () {
        return this.pso;
    };

    // Add triples to the store, with input data nested as predicates containing objects containing subjects containing values
    Hexastore.prototype.addPOS = function (element) {
        let pred = element;
        for (let predicate in pred) {
            let obj = pred[predicate];
            for (let object in obj) {
                let subj = obj[object];
                for (let subject in subj) {
                    let val = subj[subject];
                    this.put([subject, predicate, object, val]);
                }
            }
        }
    };

    Hexastore.prototype.getPOS = function () {
        return this.pos;
    };

    // Add triples to the store, with input data nested as objects containing subjects containing predicates containing values
    Hexastore.prototype.addOSP = function (element) {
        let obj = element;
        for (let object in obj) {
            let subj = obj[object];
            for (let subject in subj) {
                let pred = subj[subject];
                for (let predicate in pred) {
                    let val = pred[predicate];
                    this.put([subject, predicate, object, val]);
                }
            }
        }
    };


    Hexastore.prototype.getOSP = function () {
        return this.osp;
    };

    // Add triples to the store, with input data nested as objects containing predicates containing subjects containing values
    Hexastore.prototype.addOPS = function (element) {
        let obj = element;
        for (let object in obj) {
            let pred = obj[object];
            for (let predicate in pred) {
                let subj = pred[predicate];
                for (let subject in subj) {
                    let val = subj[subject];
                    this.put([subject, predicate, object, val]);
                }
            }
        }
    };

    Hexastore.prototype.getOPS = function () {
        return this.ops;
    };


    // Add object as a star of nodes, with name in the center, and name/prop1 around
    Hexastore.prototype.addJSObjectAsPath = function (obj, name, separator) {
        let actualseparator;
        if (separator === undefined) {
            actualseparator = "/";
        } else {
            actualseparator = separator;
        }
        if (obj === Object(obj)) {
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    this.put([name, prop, this.addJSObjectAsPath(obj[prop], name + actualseparator + prop), true]);
                }
            }
            return name;
        } else if (typeof obj == 'string' || obj instanceof String) {
            return obj;
        } else {
            return JSON.stringify(obj);
        }
    };

    // Add object as a star of nodes with UUID names except for the leaves
    Hexastore.prototype.addJSObjectAsUUID = function (obj) {
        if (obj === Object(obj)) {
            let name = uuid.v4();
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    this.put([name, prop, this.addJSObjectAsUUID(obj[prop]), true]);
                }
            }
            return name;
        } else if (typeof obj == 'string' || obj instanceof String) {
            return obj;
        } else {
            return JSON.stringify(obj);
        }
    };

    // Add object as a star of nodes with JSON names except for the leaves
    Hexastore.prototype.addJSObjectAsJSON = function (obj) {
        if (obj === Object(obj)) {
            let name = JSON.stringify(obj);
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    this.put([name, prop, this.addJSObjectAsJSON(obj[prop]), true]);
                }
            }
            return name;
        } else if (typeof obj == 'string' || obj instanceof String) {
            return obj;
        } else {
            return JSON.stringify(obj);
        }
    };

    // Make a copy of all facts related to a subject
    Hexastore.prototype.copySubject = function (subj, newsubj) {
        let res = this.queryS__([subj, null, null]);
        this.putAll(res.map(function (el) {
            return [newsubj, el[1], el[2], el[3]];
        }));
        return res.length;
    };

    // Make a copy of all facts related to a predicate
    Hexastore.prototype.copyPredicate = function (pred, newpred) {
        let res = this.query_P_([null, pred, null]);
        this.putAll(res.map(function (el) {
            return [el[0], newpred, el[2], el[3]];
        }));
        return res.length;
    };

    // Make a copy of all facts related to an object
    Hexastore.prototype.copyObject = function (obj, newobj) {
        let res = this.query__O([null, null, obj]);
        this.putAll(res.map(function (el) {
            return [el[0], el[1], newobj, el[3]];
        }));
        return res.length;
    };

    Hexastore.prototype.all = function () {
        let res = [];
        let subj = this.spo;
        if (subj !== undefined) {
            for (let subject in subj) {
                let pred = subj[subject];
                if (pred !== undefined) {
                    for (let predicate in pred) {
                        let obj = pred[predicate];
                        if (obj !== undefined) {
                            for (let object in obj) {
                                let val = obj[object];
                                if (val !== undefined) {
                                    res.push([subject, predicate, object, val]);
                                }
                            }
                        }
                    }
                }
            }
        }
        return res;
    };

    // Query the store for all facts with nothing specific (all facts)
    Hexastore.prototype.query___ = function (element) {
        let s = element[0];
        let p = element[1];
        let o = element[2];

        let res = [];

        let subj = this.spo;
        if (subj !== undefined) {
            for (let subject in subj) {
                let pred = subj[subject];
                if (pred !== undefined) {
                    for (let predicate in pred) {
                        let obj = pred[predicate];
                        if (obj !== undefined) {
                            for (let object in obj) {
                                let val = obj[object];
                                if (val !== undefined) {
                                    res.push([subject, predicate, object, val]);
                                }
                            }
                        }
                    }
                }
            }
        }
        return res;
    };

    // Query the store for all facts with specific subject
    Hexastore.prototype.queryS__ = function (element) {
        let s = element[0];
        let p = element[1];
        let o = element[2];

        let res = [];

        let subj = this.spo;
        if (subj !== undefined) {
            let pred = subj[s];
            if (pred !== undefined) {
                for (let predicate in pred) {
                    let obj = pred[predicate];
                    if (obj !== undefined) {
                        for (let object in obj) {
                            let val = obj[object];
                            if (val !== undefined) {
                                res.push([s, predicate, object, val]);
                            }
                        }
                    }
                }
            }
        }
        return res;
    };

    // Query the store for all facts with specific predicate
    Hexastore.prototype.query_P_ = function (element) {
        let s = element[0];
        let p = element[1];
        let o = element[2];

        let res = [];

        let pred = this.pso;
        if (pred !== undefined) {
            let subj = pred[p];
            if (subj !== undefined) {
                for (let subject in subj) {
                    let obj = subj[subject];
                    if (obj !== undefined) {
                        for (let object in obj) {
                            let val = obj[object];
                            if (val !== undefined) {
                                res.push([subject, p, object, val]);
                            }
                        }
                    }
                }
            }
        }
        return res;
    };

    // Query the store for all facts with specific object
    Hexastore.prototype.query__O = function (element) {
        let s = element[0];
        let p = element[1];
        let o = element[2];

        let res = [];

        let obj = this.ops;
        if (obj !== undefined) {
            let pred = obj[o];
            if (pred !== undefined) {
                for (let predicate in pred) {
                    let subj = pred[predicate];
                    if (subj !== undefined) {
                        for (let subject in subj) {
                            let val = subj[subject];
                            if (val !== undefined) {
                                res.push([subject, predicate, o, val]);
                            }
                        }
                    }
                }
            }
        }
        return res;
    };

    // Query the store for all facts with specific subject and predicate
    Hexastore.prototype.querySP_ = function (element) {
        let s = element[0];
        let p = element[1];
        let o = element[2];

        let res = [];

        let subj = this.spo;
        if (subj !== undefined) {
            let pred = subj[s];
            if (pred !== undefined) {
                let obj = pred[p];
                if (obj !== undefined) {
                    for (let object in obj) {
                        let val = obj[object];
                        if (val !== undefined) {
                            res.push([s, p, object, val]);
                        }
                    }
                }
            }
        }

        return res;
    };

    // Query the store for all facts with specific predicate and object
    Hexastore.prototype.query_PO = function (element) {
        let s = element[0];
        let p = element[1];
        let o = element[2];

        let res = [];

        let pred = this.pos;
        if (pred !== undefined) {
            let obj = pred[p];
            if (obj !== undefined) {
                let subj = obj[o];
                if (subj !== undefined) {
                    for (let subject in subj) {
                        let val = subj[subject];
                        if (val !== undefined) {
                            res.push([subject, p, o, val]);
                        }
                    }
                }
            }
        }

        return res;
    };

    // Query the store for all facts with specific subject and object
    Hexastore.prototype.queryS_O = function (element) {
        let s = element[0];
        let p = element[1];
        let o = element[2];

        let res = [];

        let subj = this.sop;
        if (subj !== undefined) {
            let obj = subj[s];
            if (obj !== undefined) {
                let pred = obj[o];
                if (pred !== undefined) {
                    for (let predicate in pred) {
                        let val = pred[predicate];
                        if (val !== undefined) {
                            res.push([s, predicate, o, val]);
                        }
                    }
                }
            }
        }

        return res;
    };

    // Query the store for all facts with specific subject predicate and object (get values of this fact)
    Hexastore.prototype.querySPO = function (element) {
        let s = element[0];
        let p = element[1];
        let o = element[2];

        let res = [];

        let subj = this.spo;
        if (subj !== undefined) {
            let pred = subj[s];
            if (pred !== undefined) {
                let obj = pred[p];
                if (obj !== undefined) {
                    let val = obj[o];
                    if (val !== undefined) {
                        res.push([s, p, o, val]);
                    }
                }
            }
        }
        return res;
    };

    // Returns a set of triples matching a single query element
    Hexastore.prototype.queryDispatch = function (queryElement) {
        if (queryElement[0] instanceof Array) {
            if (queryElement[1] instanceof Array) {
                if (queryElement[2] instanceof Array) {
                    return this.query___(queryElement);
                } else {
                    return this.query__O(queryElement);
                }
            } else {
                if (queryElement[2] instanceof Array) {
                    return this.query_P_(queryElement);
                } else {
                    return this.query_PO(queryElement);
                }
            }
        } else {
            if (queryElement[1] instanceof Array) {
                if (queryElement[2] instanceof Array) {
                    return this.queryS__(queryElement);
                } else {
                    return this.queryS_O(queryElement);
                }
            } else {
                if (queryElement[2] instanceof Array) {
                    return this.querySP_(queryElement);
                } else {
                    return this.querySPO(queryElement);
                }
            }
        }
    };

    // Take a query, and instantiate varibles in it, i.e. replacing variables instances with values from a result
    let instantiateVariablesInQuery = function (result, theQuery) {
        let query = theQuery.slice().map(function (x) {
            return x.slice();
        });
        for (let i = 0; i < query.length; i++) {
            for (let j = 0; j < 3; j++) {
                if (query[i][j] instanceof Array) {
                    if (result[query[i][j][0]] !== undefined) {
                        query[i][j] = result[query[i][j][0]];
                    }
                }
            }
        }
        return query;
    };

    // Takes a set of triples and an intermediate result, and returns a set of more complete results using informations in the triples
    let instantiateVariablesInResult = function (result, query, triples) {
        let res = [];
        for (let i = 0; i < triples.length; i++) {
            res[i] = clone(result);
            for (let j = 0; j < 3; j++) {
                if (query[j] instanceof Array) {
                    res[i][query[j][0]] = triples[i][j];
                }
            }
        }
        return res;
    };

    // Clone an object
    let clone = function (obj) {
        let target = {};
        for (let i in obj) {
            if (obj.hasOwnProperty(i)) {
                target[i] = obj[i];
            }
        }
        return target;
    };

    // Take a single result and a query and recursively return multiple results
    Hexastore.prototype.doSearch = function (result, theQuery) {
        let query = instantiateVariablesInQuery(result, theQuery);
        let triples = this.queryDispatch(query[0]);
        let results = instantiateVariablesInResult(result, query[0], triples);
        query.shift();
        let res = [];
        if (query.length > 0) {
            for (let i = 0; i < results.length; i++) {
                res = res.concat(this.doSearch(results[i], query));
            }
        } else {
            res = results;
        }
        return res;
    };

    // Bootstrap a new search with an empty result
    Hexastore.prototype.search = function (query) {
        let result = {};
        return this.doSearch(result, query);
    };

    return Hexastore;
}))

