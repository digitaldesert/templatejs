/*
  Data Seed Utility
  @
 */

define(() => {

    let seed = 1;

    function _id ( elem )
    {
        if ( elem && elem.hasAttribute('id') )
        {
            elem.getAttribute('id');
        }
        return `uid${seed++}`;
    }
    return {
        id: _id
    }
});