const all = document.getElementById("all");
const label = document.getElementById("labeled");
const taken = document.getElementById("taken");
const labeled2 = document.getElementById("labeled2");
const resRef = document.getElementById("res");
const backRef = document.getElementById("back");
const taskModelRadio = document.getElementsByName("model");
const resultRef = document.getElementById("result");
const formAll = document.getElementById("input__numbers-form-all");
const formLabeled = document.getElementById("input__numbers-form-labeled");
const formTaken = document.getElementById("input__numbers-form-taken");
const formLabeled2 = document.getElementById("input__numbers-form-labeled2");

function getTaskModel() {
    let elements = taskModelRadio;
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked)
            return elements[i].value;
    }
}

console.log(getTaskModel());
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
})
resRef.addEventListener('click', () => {
    if (getTaskModel() === 'first') {
        resultRef.innerHTML = getResultForUrn1model(all.value, label.value, taken.value);
    } else if (getRepOrNo() === 'second') {
        resultRef.innerHTML = getResultForUrn2model(all.value, label.value, taken.value, labeled2.value);
    }
});

backRef.addEventListener('click', () => {
    location.href = 'startPage.html';
})

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
