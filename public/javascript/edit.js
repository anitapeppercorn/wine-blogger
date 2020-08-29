let editModal = $('#exampleModal');
let updateBtn = document.getElementById('update');
let submitBtn = document.getElementById('submit');
let title = document.getElementsByClassName('modal-title')[0];

const name = document.querySelector('#wine');
const bottle_size = document.getElementById('sizes');
const price_paid = document.querySelector('#retail-price');
const notes = document.querySelector('#notes');

// reset the modal
const clear = () => {
    title.textContent = 'Add A Wine';

    // clear values
    name.value = '';
    bottle_size.value = '';
    price_paid.value = '';
    notes.value = '';

    // change back to the submit button
    submitBtn.style.display = 'block';
    updateBtn.style.display = 'none';
}

// update the wine post
async function update(id, wine, size, price, note, imageFile, imageKey) {
    let d = new FormData(); 

    console.log(id, wine, size, price, note, imageFile, imageKey)

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
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

const populateModal = (data, id, imageURL) => {
    title.textContent = 'Update Wine';

    // add close functionality
    document.getElementsByClassName('close')[0].addEventListener('click', clear);
    document.getElementById('close-btn').addEventListener('click', clear);

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
    const image = document.getElementById(`wine-pic-${this.id}`).src;
    const imageURL = image.split('/')[image.length - 1];

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