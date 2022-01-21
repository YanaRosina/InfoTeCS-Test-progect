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
            cellEyeColor = document.createElement('td'),
            cellEdits = document.createElement('td'),
            editDiv = document.createElement('div');


        cellFirstName.innerHTML = this.firstName;
        cellFirstName.classList = 'cell_first_name';
        cellLastName.innerHTML = this.lastName;
        cellLastName.classList = 'cell_last_name';
        cellAbout.innerHTML = this.about;
        cellAbout.classList = 'module';
        cellEyeColor.innerHTML = this.eyeColor;
        cellEyeColor.classList = 'cell_eye_color';
      /*  cellEdits.innerHTML = 'edits...';*/
        editDiv.classList = 'editing_div';
        editDiv.innerHTML = '<i class="far fa-edit"></i>';
        cellEdits.classList ='cell_edits';

        tableRow.classList = 'row';

        tableRow.appendChild(cellFirstName);
        tableRow.appendChild(cellLastName);
        tableRow.appendChild(cellAbout);
        tableRow.appendChild(cellEyeColor);
       cellEdits.appendChild(editDiv);
        tableRow.appendChild(cellEdits);
        
        tableBody.appendChild(tableRow);

    }

}

getData(dataBaseUrl)
    .then(data => {
        data.forEach((obj, i) => {
            new Person(obj.name.firstName, obj.name.lastName, obj.about, obj.eyeColor).newHtmlTableRow();
            EyeColor();

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
}

function CloseModalBlock(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    RemoveActiveClass('.row');

}
function RemoveActiveClass(arr) {
    const arrObj = document.querySelectorAll(arr);
    arrObj.forEach((row) => {
            row.classList.remove('active');
        
    });
}


//
const table = document.querySelector('.table_sort'),
modalClose = document.querySelector('.modal_close');

//EventListener
table.addEventListener('click', (event) => {
    if(event.target.className === 'editing_div' || event.target.className === 'far fa-edit') {
       OpenModalBlock('.modal_block');
       event.target.closest('.row').classList.add('active');

    }  
   });

modalClose.addEventListener('click', ()=> {
    CloseModalBlock('.modal_block');

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
        recordDataToTable(data);
        CloseModalBlock('.modal_block');
       
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

//Eye Color
function EyeColor() {
let arrEyeColors = document.querySelectorAll('.cell_eye_color');
    arrEyeColors.forEach((el) => {
        console.log(el);
        switch(el.innerHTML) {
            case 'blue':
                el.style.backgroundColor = 'blue';
                el.style.color = 'blue';
                break;
            case 'brown':
                el.style.backgroundColor = 'rgb(165, 61, 42)';
                el.style.color = 'rgb(165, 61, 42)';
                break;
            case 'red':
                el.style.backgroundColor = 'red';
                el.style.color = 'red';
                break;
            case 'green':
                el.style.backgroundColor = 'green';
                el.style.color = 'green';
                break;
            default:
                console.log ('Error!');
        }
        
});
}

