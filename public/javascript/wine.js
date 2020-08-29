async function newWineHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#wine').value.trim();
    const bottle_size = document.getElementById('sizes').value.trim();
    const price_paid = document.querySelector('#retail-price').value.trim();
    const notes = document.querySelector('#notes').value.trim();
    const image = document.querySelector('#input-image');
    console.log("image", image.files[0])

    let d = new FormData();
    d.append('image', image.files[0])
    console.log(d);

    const json = JSON.stringify({
        name,
        bottle_size,
        price_paid,
        notes
    });

    d.append('json', json)
    const response = await fetch(`/api/wine/`, {
        method: 'POST',
        body: d
    })
    if (response.ok) {
        console.log(response)
        response.json().then(data => {
            console.log(data);
        })
        document.location.reload();
    }
}

document.querySelector('.new-wine').addEventListener('submit', newWineHandler);