const title = document.querySelector('#bktitle');
const author = document.querySelector('#bkauthor');
const pages = document.querySelector('#bkpages');
const submitbtn = document.querySelector('#submitbtn');
const status = document.querySelector('#status');
const theform = document.getElementById('theform');
const myTable = document.querySelector('#myTable');
const deletebtn = document.querySelector('#deletebtn');

let number = myTable.rows.length;

const input = document.querySelectorAll('.form-control');

input.forEach((input) => {
    input.addEventListener(('blur'), (e) => {
        if (input.value == '') {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    })
})

submitbtn.addEventListener(('click'), (e) => {
    if (title.value == '') {
        title.classList.add('is-invalid');
    } else if (author.value == '') {
        author.classList.add('is-invalid');
    } else if (pages.value == '') {
        pages.classList.add('is-invalid');
    } else {

        createlements(title.value, author.value, pages.value, status.value);

        title.classList.remove('is-invalid');
        author.classList.remove('is-invalid');
        pages.classList.remove('is-invalid');
        title.classList.remove('is-valid');
        author.classList.remove('is-valid');
        pages.classList.remove('is-valid');
        theform.reset();
    }
})

function createlements(bktitle, bkauthor, bkpage, bkstatus) {

    var row = myTable.insertRow(number);
    var element1 = document.createElement('input');
    var readbtn = document.createElement('button');
    readbtn.classList.add('btn');
    readbtn.classList.add('bg-success');
    readbtn.classList.add('text-white');
    readbtn.textContent = bkstatus;
    element1.type = 'checkbox';
    element1.name = 'chkbox[]';
    element1.classList.add('checkbox');
    var firstcell = row.insertCell(0);
    firstcell.appendChild(element1);
    var secondcell = row.insertCell(1);
    var thirdcell = row.insertCell(2);
    var fourthcell = row.insertCell(3);
    var fifthcell = row.insertCell(4);
    var sixthcell = row.insertCell(5);
    secondcell.innerHTML = number;
    thirdcell.innerHTML = bktitle;
    fourthcell.innerHTML = bkauthor;
    fifthcell.innerHTML = bkpage;
    sixthcell.appendChild(readbtn);
    number++;
    const chkbutton = document.querySelectorAll('.checkbox');
    chkbutton.forEach((checkbtn) => {
        checkbtn.addEventListener(('change'), (e) => {
            if (checkbtn.checked) {
                deletebtn.disabled = false;
            } else {
                deletebtn.disabled = true;
            }
        })
    })
    readbtn.addEventListener(('click'), (e) => {
        if (readbtn.textContent == 'Read') {
            readbtn.textContent = 'Not Read';
        } else {
            readbtn.textContent = 'Read';
        }
    })
}

deletebtn.addEventListener(('click'), (e) => {
    deleteRow();
})

function deleteRow() {
    try {
        var rowCount = myTable.rows.length;
        for (var i = 0; i < rowCount; i++) {
            var row = myTable.rows[i];
            var chkbox = row.cells[0].childNodes[0];
            if (null != chkbox && chkbox.checked == true) {
                myTable.deleteRow(i);
                rowCount--;
                i--;
                number--;
            }
        }
    } catch (e) {
        console.log(e);
        alert(e);
    }
}