let modal = document.getElementById('exampleModal');

const close = () => {
    modal.style.display = 'none';
    modal.classList.remove('show');
}

const populateModal = (data) => {
    console.log(data)
    console.log(document.getElementById('exampleModal'))
    modal.style.display = 'block';
    modal.classList.add('show');
    
    document.getElementsByClassName('close')[0].addEventListener('click', close);
    document.getElementById('close-btn').addEventListener('click', close);

    const name = document.querySelector('#wine').value = data.name;
    const bottle_size = document.querySelector('#size').value = data.bottle_size;
    const price_paid = document.querySelector('#retail-price').value = data.price_paid;
    const notes = document.querySelector('#notes').value = data.notes;
}

async function editClickHandler(event) {
    event.preventDefault();

    const response = await fetch(`/api/wine/${this.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        response.json().then(data => populateModal(data));
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.wine-name').addEventListener('click', editClickHandler);