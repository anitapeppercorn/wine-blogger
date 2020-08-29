let editModal = document.getElementById('exampleModal');
let updateBtn = document.getElementById('update');
let submitBtn = document.getElementById('submit');

const name = document.querySelector('#wine');
const bottle_size = document.getElementById('sizes');
const price_paid = document.querySelector('#retail-price');
const notes = document.querySelector('#notes');

// reset the modal
const clear = () => {
    // clear values
    name.value = '';
    bottle_size.selectedIndex = 0;
    price_paid.value = '';
    notes.value = '';

    // change back to the submit button
    submitBtn.style.display = 'block';
    updateBtn.style.display = 'none';
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

    // TODO: handle if the image is not updated
    // FIXME: 500 error code
    // if(imageFile.files[0]) {
    //     d.append('image', imageFile.files[0]);
    // }
    
    d.append('image', imageFile.files[0]);
    d.append('json', JSON.stringify({
        name: wine,
        bottle_size: size,
        price_paid: price,
        notes: note,
        imageKey: imageKey
    }))

    // update the db
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

const populateModal = (data, id, imageURL) => {
    // show the modal
    editModal.style.display = 'block';
    editModal.classList.add('show');

    // add close functionality
    document.getElementsByClassName('close')[0].addEventListener('click', close);
    document.getElementById('close-btn').addEventListener('click', close);

    // hide the submit button
    submitBtn.style.display = 'none';
    updateBtn.style.display = 'block';

    updateBtn.addEventListener('click', () => update(id, name.value, bottle_size.value, price_paid.value, notes.value, document.querySelector('#input-image'), imageURL));
    
    // populate the modal
    name.value = data.name;
    bottle_size.value = data.bottle_size;
    price_paid.value = data.price_paid;
    notes.value = data.notes;
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