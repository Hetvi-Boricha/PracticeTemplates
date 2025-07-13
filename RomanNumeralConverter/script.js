let input = document.querySelector("#number");
let btn = document.querySelector("#convert-btn");
let result = document.querySelector("#output");

btn.addEventListener("click",()=>{
    const value = input.value.trim();

    if (value === "") {
        result.innerText = "Please enter a valid number";
        return;
    }
     const num = parseInt(value);
    if (isNaN(num)) {
    result.innerText = "Please enter a valid number";
    return;
  }
    if(num <1 ){
        result.innerText="Please enter a number greater than or equal to 1"
        return;
    }
    if(num >=4000 ){
        result.innerText="Please enter a number less than or equal to 3999"
    }
  const romanNumerals = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" }
  ];

  let roman = "";
  let remaining = num;

  for (let i = 0; i < romanNumerals.length; i++) {
    while (remaining >= romanNumerals[i].value) {
      roman += romanNumerals[i].numeral;
      remaining -= romanNumerals[i].value;
    }
  }

  result.innerText = roman;
});