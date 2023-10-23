let select = document.getElementById('oper-select');
let radioButtons = document.getElementsByName('repetition');
let first = document.getElementById("first");
let second = document.getElementById("second");
const form1 = document.getElementById("input__numbers-form-first");
const form2 = document.getElementById("input__numbers-form-second");
const resultRef = document.getElementById("result");
const backButtonRef = document.getElementById("back");
let resultButtonRef = document.getElementById("getResult");

backButtonRef.addEventListener('click', () => {
    location.href = 'startPage.html';
})

select.addEventListener('change', function () {
    if (this.value === "permutations" && getRepOrNo() === 'no') {
        form1.style.display = 'block';
        form2.style.display = 'none';
    } else {
        form1.style.display = 'block';
        form2.style.display = 'block';
    }
});

radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('change', function () {
        let selectedOper = select.value;
        if (selectedOper !== '') {
            if (this.value === 'no' && selectedOper === 'permutations') {
                form1.style.display = 'block';
                form2.style.display = 'none';
            } else {
                form1.style.display = 'block';
                form2.style.display = 'block';
            }
        } else {
            form1.style.display = 'none';
            form2.style.display = 'none';
            form1.style.display = 'none';
            form2.style.display = 'none';
        }
    });
});

const fact = (num) => {
    let result = 1;
    while (num !== 0) {
        result *= num--;
    }
    return BigInt(result);
}
const getResultForPlaceWithRep = (num1, num2) => {
    return BigInt(Math.pow(num1, num2));
}
const getResultForPlaceWithoutRep = (num1, num2) => {
    let result, fact1, fact2;
    if (num1 >= num2) {
        fact1 = fact(num1);
        fact2 = fact(num1 - num2);
        result = fact1 / fact2;
    } else {
        result = "n < k. Check entered data";
    }
    return result;
}

const getResultForComb = (num1, num2) => {
    let result, fact1, fact2;
    if (num1 >= num2) {
        fact1 = fact(num1);
        fact2 = fact(num1 - num2) * fact(num2);
        result = fact1 / fact2;
    } else {
        result = "n < k. Check entered data";
    }
    return result;
}

const getResultForPermWithRep = (num1, num2) => {
    let result, fact1, sum = 0, fact2 = 1;
    let numbers = num2.split(' ');
    for (let i = 0; i < numbers.length; i++) {
        sum += Number(numbers[i]);
    }
    if (sum === Number(num1)) {
        fact1 = fact(num1);
        numbers.map((x) => fact(x));
        for (let i = 0; i < numbers.length; i++) {
            fact2 *= numbers[i];
        }
        result = fact1 / fact2;
    } else {
        result = "sum of n1, n2,..., nk is not n"
    }
    return BigInt(result);
}
const getResultForPermWithoutRep = (num1) => {
    return fact(num1);
}


const getRepOrNo = () => {
    let elements = document.getElementsByName("repetition");
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked)
            return elements[i].value;
    }
}
const dataIsCorrect = () => {
    let selectedOper = select.value;
    return selectedOper !== '' && getRepOrNo() !== undefined && (first.value !== '' || second.value !== '');
}
const getResult = () => {
    let res;
    let selectedOper = select.value;
    if (getRepOrNo() === 'no' && selectedOper !== '') {
        if (selectedOper === 'permutations') {
            res = getResultForPermWithoutRep(first.value);
        } else if (selectedOper === 'placements') {
            res = getResultForPlaceWithoutRep(first.value, second.value);
        } else if (selectedOper === 'combinations') {
            res = getResultForComb(first.value, second.value);
        }
    } else if (getRepOrNo() === 'with' && selectedOper !== '') {
        if (selectedOper === 'permutations') {
            res = getResultForPermWithRep(first.value, second.value);
        } else if (selectedOper === 'combinations') {
            res = getResultForComb((Number(first.value) + Number(second.value) - 1), second.value);
        } else if (selectedOper === 'placements') {
            res = getResultForPlaceWithRep(first.value, second.value);
        }
    }
    return res;
}

function activateResultButton() {
    if (dataIsCorrect()) {
        resultButtonRef.disabled = false;
    } else {
        resultButtonRef.disabled = true;
    }
}

select.addEventListener('change', activateResultButton);
radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('change', () => {
        activateResultButton()
    })
});
first.addEventListener('input', activateResultButton);
second.addEventListener('input', activateResultButton);

resultButtonRef.addEventListener('click', () => {
    resultRef.innerText = getResult();
})

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
