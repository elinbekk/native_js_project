const all = document.getElementById("all");
const label = document.getElementById("labeled");
const taken = document.getElementById("taken");
const labeled2 = document.getElementById("labeled2");
const resultButtonRef = document.getElementById("getResult");
const backRef = document.getElementById("back");
const taskModelRadio = document.getElementsByName("model");
const resultRef = document.getElementById("result");
const formAll = document.getElementById("input__numbers-form-all");
const formLabeled = document.getElementById("input__numbers-form-labeled");
const formTaken = document.getElementById("input__numbers-form-taken");
const formLabeled2 = document.getElementById("input__numbers-form-labeled2");

backRef.addEventListener('click', () => {
    location.href = 'startPage.html';
})

function getTaskModel() {
    let elements = document.getElementsByName("model");
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked)
            return elements[i].value;
    }
}

taskModelRadio.forEach((model) => {
    model.addEventListener('change', () => {
        if (model.value === 'first') {
            formAll.style.display = 'block';
            formLabeled.style.display = 'block';
            formTaken.style.display = 'block';
            formLabeled2.style.display = 'none';
        } else if (model.value === 'second') {
            formAll.style.display = 'block';
            formLabeled.style.display = 'block';
            formTaken.style.display = 'block';
            formLabeled2.style.display = 'block';
        }
    })
});


const fact = (num) => {
    let result = 1;
    while (num !== 0) {
        result *= num--;
    }
    return result;
}
const getComb = (num1, num2) => {
    let result, fact1, fact2;
    if (num1 >= num2) {
        fact1 = fact(num1);
        fact2 = fact(num1 - num2) * fact(num2);
        result = fact1 / fact2;
    } else {
        result = num1 + " < " + num2 + " Check entered data";
    }
    return result;
}
const getResultForUrn1model = (n, m, k) => {
    return getComb(m, k) / getComb(n, k);
}
const getResultForUrn2model = (n, m, k, r) => {
    let rm = getComb(m, r);
    let s = getComb(n - m, k - r);
    return (rm * s) / getComb(n, k);
}
const dataIsCorrect = () => {
    return getTaskModel() !== undefined && (all.value !== '' && taken.value !== '' && label.value !== '' || labeled2.value !== '');
}
const getResult = () => {
    let result;
    if (getTaskModel() === 'first') {
        result = getResultForUrn1model(all.value, label.value, taken.value);
    } else if (getRepOrNo() === 'second') {
        result = getResultForUrn2model(all.value, label.value, taken.value, labeled2.value);
    }
    return result;
}
function activateResultButton() {
    if (dataIsCorrect()) {
        resultButtonRef.disabled = false;
    } else {
        resultButtonRef.disabled = true;
    }
}

taskModelRadio.forEach(function (radioButton) {
    radioButton.addEventListener('change', () => {
        activateResultButton()
    })
});
all.addEventListener('input', activateResultButton);
taken.addEventListener('input', activateResultButton);
label.addEventListener('input', activateResultButton);
labeled2.addEventListener('input', activateResultButton);

resultButtonRef.addEventListener('click', () => {
    resultRef.innerText = getResult();
});


const url = 'https://test.com/results';
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        result: getResult()
    })
};

fetch(url, options)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.body.innerText = data.title;
    })
    .catch(error => console.log(error));

