'use strict';

let dataBaseUrl = 'db.json';
const getData = async (dataBaseUrl) => {
    const res = await fetch(dataBaseUrl);

    if (!res.ok) {
        throw new Error(`Could not fatch ${dataBaseUrl}, status: ${res.status}`);
    }

    return await res.json();
};


class Person {
    constructor(firstName, lastName, about, eyeColor) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.about = about;
        this.eyeColor = eyeColor;
    }

    newHtmlTableRow() {

        const tableBody = document.querySelector('.table_body'),
            tableRow = document.createElement('tr'),
            cellFirstName = document.createElement('td'),
            cellLastName = document.createElement('td'),
            cellAbout = document.createElement('td'),
            cellEyeColor = document.createElement('td');


        cellFirstName.innerHTML = this.firstName;
        cellAbout.classList = 'module';
        cellLastName.innerHTML = this.lastName;
        cellAbout.innerHTML = this.about;
        cellEyeColor.innerHTML = this.eyeColor;

        tableRow.appendChild(cellFirstName);
        tableRow.appendChild(cellLastName);
        tableRow.appendChild(cellAbout);
        tableRow.appendChild(cellEyeColor);
        tableBody.appendChild(tableRow);

    }

}

getData(dataBaseUrl)
    .then(data => {
        data.forEach((obj) => {
            new Person(obj.name.firstName, obj.name.lastName, obj.about, obj.eyeColor).newHtmlTableRow();
        });
    });

// Table Sort

    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru']);
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );

        for (const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for (const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };

    document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', (event) => getSort(event)));


 
