let editModal = document.getElementById('exampleModal');
let updateBtn = document.getElementById('update');

const name = document.querySelector('#wine');
const bottle_size = document.querySelector('#size');
const price_paid = document.querySelector('#retail-price');
const notes = document.querySelector('#notes');

// reset the modal
const clear = () => {
    // clear values
    name.value = '';
    bottle_size.value = '';
    price_paid.value = '';
    notes.value = '';
    name.placeholder = '';
    bottle_size.placeholder = '';
    price_paid.placeholder = '';
    notes.placeholder = '';

    // change back to the submit button
    document.getElementById('submit').style.display = 'block';
    document.getElementById('update').style.display = 'none';
}

// close the modal
const close = () => {
    editModal.style.display = 'none';
    editModal.classList.remove('show');
    clear();
}



// update the wine post
async function update(id, wine, size, price, note, imageFile, imageKey) {
    
    let d = new FormData(); 
    d.append('image', imageFile.files[0])
    d.append('json', JSON.stringify({
        name: wine,
        bottle_size: size,
        price_paid: price,
        notes: note,
        imageKey: imageKey
    }))
    /** headers: {
            'Content-Type': 'application/json'
        } */
    const response = await fetch(`/api/wine/${id}`, {
        method: 'PUT',
        body: d
    });

    if (response.ok) {
        clear();
        close();
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

const checkValue = (val) => {
    return val.value == ''  ? val.placeholder : val.value;
}

// aysnc getImgUrl = () => {

// }

const populateModal = (data, id, imageURL) => {
    // console.log(data)

    // show the modal
    editModal.style.display = 'block';
    editModal.classList.add('show');

    // add close functionality
    document.getElementsByClassName('close')[0].addEventListener('click', close);
    document.getElementById('close-btn').addEventListener('click', close);
    // hide the submit button
    document.getElementById('submit').style.display = 'none';
    
    updateBtn.style.display = 'block';

    updateBtn.addEventListener('click', () => {
        const imageFile = document.querySelector('#input-image');
        update(id, checkValue(name), checkValue(bottle_size), checkValue(price_paid), notes.value, imageFile,  imageURL);
    });
    
    // populate the modal
    name.placeholder = data.name;
    bottle_size.placeholder = data.bottle_size;
    price_paid.placeholder = data.price_paid;
    notes.value = data.notes;
    // image
}

async function editClickHandler(event) {
    event.preventDefault();
    const image = document.getElementById(`wine-pic-${this.id}`).src.split('/');
    const imageURL = image[image.length - 1];

    // get the data
    const response = await fetch(`/api/wine/${this.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        // pass the data
        response.json().then(data => populateModal(data, this.id, imageURL));
    } else {
        alert(response.statusText);
    }
}

$(document).on('click', '.wine-name', editClickHandler);