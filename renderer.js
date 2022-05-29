const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let headers = [];

function send () {
    let url = $('#url').value;
    let method = getMethod();
    let headers = getHeaders();
    let data = $('#data').value;

    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    for (let i = 0; i < headers.length; i++) {
        xhr.setRequestHeader(headers[i].key, headers[i].value);
    }

    xhr.onload = () => {
        alert(xhr.response);
    }

    xhr.onerror = (e) => {
        console.log(e);
        alert('Error');
    }

    xhr.send(data);
}

function addHeader (keyData = '', valueData = '') {
    let key = document.createElement('input');
    let value = document.createElement('input');
    let button = document.createElement('button');
    
    key.setAttribute('type', 'text');
    value.setAttribute('type', 'text');
    button.setAttribute('type', 'button');
    
    key.setAttribute('placeholder', 'Key');
    value.setAttribute('placeholder', 'Value');

    key.value = keyData;
    value.value = valueData;
    
    button.innerHTML = '&#10007;';
    
    key.addEventListener('keydown', function (e) {
        if (e.key == 'Enter') {
            e.preventDefault();
        }
    });

    value.addEventListener('keydown', function (e) {
        if (e.key == 'Enter') {
            e.preventDefault();
        }
    });

    let headerData = {
        key,
        value
    };
    headers.push(headerData);

    let div = document.createElement('div');
    div.classList.add('header');
    div.appendChild(key);
    div.appendChild(value);
    div.appendChild(button);
    $('#headers').appendChild(div);

    button.addEventListener('click', function () {
        headers.splice(headers.indexOf(headerData), 1);
        div.remove();
    });
}

function getMethod () {
    let methods = $$('input[name="method"]');

    for (let i = 0; i < methods.length; i++) {
        if (methods[i].checked) {
            return methods[i].value;
        }
    }
}

function getHeaders () {
    let result = [];

    for (let i = 0; i < headers.length; i++) {
        result.push({
            key: headers[i].key.value,
            value: headers[i].value.value
        });
    }

    return result;
}

window.onload = () => {
    addHeader('Content-Type', 'application/json');

    $('#data').value = '{\n\t"name": "",\n\t"username": "",\n\t"email": "",\n\t"password": ""\n}';
}