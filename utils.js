/* UTILS */
function pick(query) {
    return document.querySelector(query);
}

function pickAll(query) {
    return document.querySelectorAll(query);
}

function clicky(query, fn) {
    pick(query).addEventListener('click', fn);
}

function clickAllTheThings(query, fn) {
    pickAll(query).forEach(thingy => { 
        thingy.addEventListener('click', fn);
    });
}


function make(element) {
    return document.createElement(element);
}
