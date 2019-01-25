// y0

function needfulDoer() {
    let rows = parseInt(pick('#rows').value);
    let cols = parseInt(pick('#cols').value);
    let letters = parseInt(pick('#letters').value);
    let letter_rows = Math.ceil(letters / cols);

    let xword = pick('#xword-holder');
    let table = make('table');
    let thead = make('thead');
    let tbody = make('tbody');
    let tfoot = make('tfoot');

    let letter_cell_count = 0;
    for (var hrow = 0; hrow < letter_rows; hrow++) {
        let tr = make('tr');
        for (var hcell = 0; hcell < cols; hcell++, letter_cell_count++) {
            let td = make('td');
            if (letter_cell_count < letters) {
                td.classList.add('letter-cell');
                td.classList.add('nth-letter-' + (letter_cell_count+1));
            } else {
                td.classList.add('blank-cell');
            }
            tr.appendChild(td);
        }
        thead.appendChild(tr);
    }
    table.appendChild(thead);

    for (var brow = 0; brow < rows; brow++) {
        let tr = make('tr');
        for (var bcell = 0; bcell < cols; bcell++) {
            let td = make('td');
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    let footer_row = make('tr');
    let footer_cell = make('td');
    footer_cell.setAttribute('colspan', cols);
    footer_cell.setAttribute('align', 'center');
    footer_cell.innerText = '(C) YOLO SWAGGINZ';
    footer_row.appendChild(footer_cell);
    tfoot.appendChild(footer_row);
    table.appendChild(tfoot);

    xword.appendChild(table);

}




/* UTILS */
function pick(query) {
    return document.querySelector(query);
}

function clicky(query, fn) {
    pick(query).addEventListener('click', fn);
}

function make(element) {
    return document.createElement(element);
}

/* Setup events finally */
clicky('#doerbutton', needfulDoer);
