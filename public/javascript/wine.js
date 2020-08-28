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

    //const blob = new Blob([json], {type: 'application/json'});
    d.append('json', json)
    const response = await fetch(`/api/wine/`, {
        method: 'POST', 
        body: d
    })
    if(response.ok) {
        console.log(response)
        response.json().then(data => {
            console.log(data);
        })
    }
    /*const response = await fetch(`/api/wine`, {
        method: 'POST',
        body: "",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/inventory');
    } else {
        alert(response.statusText);
    }*/
}

document.querySelector('.new-wine').addEventListener('submit', newWineHandler);