function onButtonClicked() {
    const validationError = document.getElementById('validation_error');
    validationError.classList.add('hidden');

    const parentPict = document.getElementById('pictures_container');
    parentPict.replaceChildren();

    const value = +document.querySelector('input').value;

    if (Number.isNaN(value) || value < 1 || value > 10) {
        validationError.classList.remove('hidden');
    } else {
        const xhr = new XMLHttpRequest();
        xhr.open('get', `https://picsum.photos/v2/list?limit=${value}`);

        xhr.onload = function() {
            if(xhr.status != 200) {
                console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                const responseItems = JSON.parse(xhr.response);
                const pictures = responseItems.map((item) => {
                    const pict = document.createElement('img');
                    pict.src = item.download_url;

                    return pict;
                });

                parentPict.replaceChildren(...pictures);
            }
        }
        xhr.send();
    }
}

