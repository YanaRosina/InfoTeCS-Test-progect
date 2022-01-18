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

    newHtmlTableRow(i) {

        const tableBody = document.querySelector('.table_body'),
            tableRow = document.createElement('tr'),
            cellFirstName = document.createElement('td'),
            cellLastName = document.createElement('td'),
            cellAbout = document.createElement('td'),
            cellEyeColor = document.createElement('td');


        cellFirstName.innerHTML = this.firstName;
        cellFirstName.classList = 'cell_first_name';
        cellLastName.innerHTML = this.lastName;
        cellLastName.classList = 'cell_last_name';
        cellAbout.innerHTML = this.about;
        cellAbout.classList = 'module';
        cellEyeColor.innerHTML = this.eyeColor;
        cellEyeColor.classList = 'cell_eye_color';

        tableRow.classList = 'row';

        tableRow.appendChild(cellFirstName);
        tableRow.appendChild(cellLastName);
        tableRow.appendChild(cellAbout);
        tableRow.appendChild(cellEyeColor);
        tableBody.appendChild(tableRow);
        /*console.log(tableRow.getBoundingClientRect());*/

    }

}

function createRowDiv (i) {
    const editingBlock = document.querySelector('.editing_block'),
    editingDiv = document.createElement('div');
    editingDiv.innerHTML = i;
    editingDiv.classList = 'editing_div';
    editingBlock.appendChild(editingDiv);
  /*  console.log(editingDiv.getBoundingClientRect());*/
}

getData(dataBaseUrl)
    .then(data => {
        data.forEach((obj, i) => {
            new Person(obj.name.firstName, obj.name.lastName, obj.about, obj.eyeColor).newHtmlTableRow(i);
            createRowDiv (i);

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

    document.querySelectorAll('.table_sort thead').forEach(tableTH => 
        tableTH.addEventListener('click', (event) => getSort(event))); 
        

 //Modal

 function OpenModalBlock(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    RemoveActiveClass('.row');

    /*document.body.style.overflow = 'hidden';*/
}

function CloseModalBlock(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');

    /*document.body.style.overflow = '';*/
}
function RemoveActiveClass(arr) {
    const arrObj = document.querySelectorAll(arr);
    arrObj.forEach((row) => {
            row.classList.remove('active');
        
    });
}


//Detectet Y position of Row 
function AddRowActive(arr,position) {
    const tableRows = document.querySelectorAll(arr);
    tableRows.forEach((row)=> {
        if(row.getBoundingClientRect().top == position){
            row.classList.add('active');
            /*console.log(row.getBoundingClientRect().top);*/
        }
    });
}
const editingBlock = document.querySelector('.editing_block'),
modalClose = document.querySelector('.modal_close');

//EventListener
editingBlock.addEventListener('click', (event) => {
    if(event.target.className === 'editing_div') {
        OpenModalBlock('.modal_block');
        const positionY = event.target.getBoundingClientRect().top;
       /* console.log(positionY);*/
       AddRowActive('.row', positionY);
    }
    
    });

modalClose.addEventListener('click', ()=> {
    CloseModalBlock('.modal_block');
   /* RemoveActiveClass('.row');*/
});



//Form Submit

function getFormData(event) {
    
        event.preventDefault();
        const formFirstName = form.querySelector('[name="first_name"]'),
        formLastName = form.querySelector('[name="last_name"]'),
        formAbout = form.querySelector('[name="about"]'),
        formEyeColor = form.querySelector('[name="eye_color"]');
        
        const data = {
            name: formFirstName.value,
            surName: formLastName.value,
            about: formAbout.value,
            eyeColor: formEyeColor.value
        }
        CloseModalBlock('.modal_block');
        recordDataToTable(data);
};

 form = document.getElementById('form');
 form.addEventListener('submit', getFormData);


//RecordDataToTable

function recordDataToTable (obj) {
    const arr = document.querySelectorAll('.row');
    arr.forEach((item) => {
        if(item.classList.contains('active')) {
        const recordName = item.querySelector('.cell_first_name'),
        recordSurname = item.querySelector('.cell_last_name'),
        recordAbout = item.querySelector('.module'),
        recordEyeColor = item.querySelector('.cell_eye_color');
        recordName.innerHTML = obj.name;
        console.log(recordName);
        recordSurname.innerHTML= obj.surName;
        recordAbout.innerHTML = obj.about;
        recordEyeColor.innerHTML = obj.eyeColor;
        }
    });
}