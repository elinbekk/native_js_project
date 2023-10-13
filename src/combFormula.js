let select = document.getElementById('oper-select');
let radioButtons = document.getElementsByName('repetition');
const first = document.getElementById("first");
const second = document.getElementById("second");
const resRef = document.getElementById("getResult");
const form1 = document.getElementById("input__numbers-form-first");
const form2 = document.getElementById("input__numbers-form-second");
const resultRef = document.getElementById("result");
const backRef = document.getElementById("back");

radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('change', function () {
        let selectedOper = select.options[select.selectedIndex].value;
        if (selectedOper !== '') {
            if (this.value === 'no' && selectedOper === 'permutations') {
                form1.style.display = 'block';
                form2.style.display = 'none';
            } else {
                form1.style.display = 'block';
                form2.style.display = 'block';
            }
        }
    });
});

select.addEventListener('change', function () {
    if (this.value === "permutations" && getRepOrNo() === 'no') {
        form1.style.display = 'block';
        form2.style.display = 'none';
    } else {
        form1.style.display = 'block';
        form2.style.display = 'block';
    }
});


resRef.addEventListener('click', () => {
    let selectedOper = select.options[select.selectedIndex].value;
    if (getRepOrNo() === 'no') {
        if (selectedOper === 'permutations') {
            resultRef.innerHTML = getResultForPermWithoutRep(first.value);
        } else if (selectedOper === 'combinations') {
            resultRef.innerHTML = getResultForPlaceWithoutRep(first.value, second.value);
        } else if (selectedOper === 'placements') {
            resultRef.innerHTML = getResultForComb(first.value, second.value);
        }
    } else if (getRepOrNo() === 'with') {
        if (selectedOper === 'permutations') {
            resultRef.innerHTML = getResultForPermWithRep(first.value, second.value);
        } else if (selectedOper === 'combinations') {
            resultRef.innerHTML = getResultForComb((Number(first.value) + Number(second.value) - 1), second.value);
        } else if (selectedOper === 'placements') {
            resultRef.innerHTML = getResultForPlaceWithRep(first.value, second.value);
        }
    }

});

backRef.addEventListener('click', () => {
    location.href = 'startPage.html';
})
const fact = (num) => {
    let result = 1;
    while (num !== 0) {
        result *= num--;
    }
    return result;
}
const getResultForPlaceWithRep = (num1, num2) => {
    return Math.pow(num1, num2);
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
    return result;
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