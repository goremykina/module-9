document.addEventListener("DOMContentLoaded", () => {
    const cache = getCache();
    if (cache) {
        addPictures(cache.urls);
    }
});

async function onButtonClicked() {
    clearValidation();

    const numberInput = document.getElementById('input_number');
    const limitInput = document.getElementById('input_limit');
    const number = +numberInput.value;
    const limit = +limitInput.value;
    const validationError = validate(number, limit);


    if (validationError) {
        addValidationError(validationError);
        return;
    }

    const response = await fetch(`https://picsum.photos/v2/list?page=${number}&limit=${limit}`);
    if (!response.ok) {
        throw `Request failed with status code ${response.status}`;
    }
    
    const result = await response.json();
    const cache = { number, limit, urls: result };

    saveCache(cache);
    addPictures(result);
}

function addPictures(pictUrls) {
    const parentPict = document.getElementById('pictures_container');
    const pictures = pictUrls.map(url => {
        const pict = document.createElement('img');
        pict.src = url.download_url;
        pict.classList.add('create_block');
    
        return pict;
    });
    
    parentPict.replaceChildren(...pictures)
}

function clearValidation() {
    const errors = document.getElementsByClassName('validation_error');
    Array.from(errors).forEach(error => {
        error.remove();
    });
}

function validate(number, limit) {
    if (!isValid(number) && !isValid(limit)) {
        return 'Номер страницы и лимит вне диапазона от 1 до 10';
    }
    
    if (!isValid(number)) {
        return 'Номер страницы вне диапазона от 1 до 10';
    }
    
    if (!isValid(limit)) {
        return 'Лимит вне диапазона от 1 до 10';
    }

    return null;
}

function isValid(value) {
    return value && value >= 1 && value <= 10;
}

function addValidationError(message) {
    const parent = document.getElementById('block_form');
    const validationError = document.createElement('h1');

    parent.appendChild(validationError).classList.add('validation_error');
    validationError.innerText = message;
}

function saveCache(cache) {
    localStorage.setItem('cache', JSON.stringify(cache));
}

function getCache() {
    const cacheJson = localStorage.getItem('cache');
    return cacheJson ? JSON.parse(cacheJson) : null;
}
