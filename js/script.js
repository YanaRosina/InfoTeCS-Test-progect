
let dataBaseUrl = 'db.json';
const getData = async (dataBaseUrl) => {
    const res = await fetch(dataBaseUrl);

    if (!res.ok) {
        throw new Error(`Could not fatch ${dataBaseUrl}, status: ${res.status}`);
    }

    return await res.json();
};
// Create table
    const tableBody = document.querySelector('.table_body'),
        tableRow = document.createElement('tr'),
        cellFirstName = document.createElement('td'),
        cellLastName = document.createElement('td'),
        cellAbout = document.createElement('td'),
        cellEyeColor = document.createElement('td');

    class Person {
        constructor(firstName, lastName, about, eyeColor) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.about = about;
            this.eyeColor = eyeColor;
        }

        newHtmlTableRow() {
            cellFirstName.innerHTML = this.firstName;
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
            //console.log(obj.name.firstName, obj.name.lastName, obj.about, obj.eyeColor);     
       });
    
        //console.log(Object.keys(data).length);
    });
    
        


//export default persons;


