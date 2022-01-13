let dataBaseUrl = 'db.json';
const getData = async (dataBaseUrl) => {
    const res = await fetch(dataBaseUrl);

    if (!res.ok) {
        throw new Error(`Could not fatch ${dataBaseUrl}, status: ${res.status}`);
    }

    return await res.json();
};
//Cut row
/*function cutAboutText(str) {
    if (str.length > 80){
        return str.substr(0,80)+'...'
    } else return str;
}*/
// Create table

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
        cellAbout.classList='module';
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