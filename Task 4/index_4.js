async function onButtonClicked() {
    const validationError = document.getElementById('validation_error');
    validationError.classList.add('hidden');

    const parentPict = document.getElementById('pictures_container');
    parentPict.replaceChildren();

    const width = +document.getElementById('input_width').value;
    const height = +document.getElementById('input_height').value;

    if (!isValidSideSize(width) || !isValidSideSize(height)) {
        validationError.classList.remove('hidden');
        return;
    }

    const response = await fetch('https://picsum.photos/200/300');
    if (!response.ok) {
        throw `Request failed with status code ${response.status}`;
    }

    const picture = document.createElement('img');
    picture.src = response.url;
    picture.style.width = `${width}px`
    picture.style.height = `${height}px`

    parentPict.appendChild(picture);
}

function isValidSideSize(value) {
    return value && value >= 100 && value <= 300;
}