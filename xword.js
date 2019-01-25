// y0





/* UTILS */
function pick(query) {
    return document.querySelector(query);
}

function clicky(query, fn) {
    pick(query).addEventListener('click', fn);
}

/* Setup events finally */
clicky('#doerbutton', needfulDoer);
