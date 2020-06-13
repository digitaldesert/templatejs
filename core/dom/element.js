/*
  element utils
  @
 */

define(['/core/data/seed.js', '/core/data/eval.js'],(Seed, Safe ) => {
    function _data ( elem ) {
        if ( elem && elem.hasAttribute('datastore') )
        {
            return Safe.eval(elem.getAttribute('datastore'));
        }
        return {}
    }

    return {
        id: Seed.id,
        data: _data
    }
});