/* UTILS */
function pick(query) {
    return document.querySelector(query);
}

function clicky(query, fn) {
    pick(query).addEventListener('click', fn);
}

function clickAllTheThings(query, fn) {
    document.querySelectorAll(query).forEach(thingy => { 
        thingy.addEventListener('click', fn);
    });
}


function make(element) {
    return document.createElement(element);
}
