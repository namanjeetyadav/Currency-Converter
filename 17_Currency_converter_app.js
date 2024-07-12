const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies"


const dropdown = document.querySelectorAll(".all-select select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

const message = document.querySelector(".message");

for (let select of dropdown) {
    for (let curr in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = curr;
        newOption.value = curr;
        if (select.name === "from" && curr === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && curr === "INR") {
            newOption.selected = "selected"
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();  //Restrict the default behaviour of form to refresh the page while submission.
    let amount = document.querySelector(".amount input")
    let amountValue = amount.value;
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }
    console.log(fromCurr.value, toCurr.value);

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;



    let response = await fetch(URL);
    let data = await response.json();
    let rates = (data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]);
    console.log(rates);
    let finalAmt = amountValue * rates;

    message.innerHTML = `${amountValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value} `;


});