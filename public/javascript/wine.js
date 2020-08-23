async function newWineHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#wine').value.trim();
    const bottle_size = document.querySelector('#size').value.trim();
    const price_paid = document.querySelector('#retail-price').value.trim();
    const notes = document.querySelector('#notes').value.trim();

    const response = await fetch(`/api/wine`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            bottle_size,
            price_paid,
            notes
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/inventory');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-wine').addEventListener('submit', newWineHandler);