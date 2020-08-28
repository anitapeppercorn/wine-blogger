let editModal = document.getElementById('exampleModal');
let footer = document.getElementsByClassName('modal-footer')[0];

const name = document.querySelector('#wine');
const bottle_size = document.querySelector('#size');
const price_paid = document.querySelector('#retail-price');
const notes = document.querySelector('#notes');
// const image

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
    footer.removeChild(footer.childNodes[5]); 
}

// close the modal
const close = () => {
    editModal.style.display = 'none';
    editModal.classList.remove('show');
    clear();
}

// update the wine post
async function update(id, wine, size, price, note) {
    console.log(id, wine, size, price, note)
    const response = await fetch(`/api/wine/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name: wine,
            bottle_size: size,
            price_paid: price,
            notes: note
        }),
        headers: {
            'Content-Type': 'application/json'
        }
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

const populateModal = (data, id) => {
    console.log(data)

    // show the modal
    editModal.style.display = 'block';
    editModal.classList.add('show');

    // add close functionality
    document.getElementsByClassName('close')[0].addEventListener('click', close);
    document.getElementById('close-btn').addEventListener('click', close);
    // hide the submit button
    document.getElementById('submit').style.display = 'none';
    
    // add the update button
    let updateBtn = document.createElement('button');
    updateBtn.innerText = 'Update';
    updateBtn.className = 'btn btn-primary';
    footer.appendChild(updateBtn);

    updateBtn.addEventListener('click', () => {
        update(id, checkValue(name), checkValue(bottle_size), checkValue(price_paid), notes.value);
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

    // get the data
    const response = await fetch(`/api/wine/${this.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        // pass the data
        response.json().then(data => populateModal(data, this.id));
    } else {
        alert(response.statusText);
    }
}

// FIXME: only adding the event listener to the first element
Array.from(document.getElementsByClassName('wine-name')).forEach(element  => {
    element.addEventListener('click', editClickHandler);
});


// FIXME: datalist removes the option list after the user clicks on an option 
    // (broken for the 'Add' wine option too)