let price = 19.5;
let cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];

let cashInput = document.querySelector("#cash");
let purchaseBtn = document.querySelector("#purchase-btn");
let changeDiv = document.querySelector("#change-due");

purchaseBtn.addEventListener("click", () => {
  const cash = parseFloat(cashInput.value);
  
  if (isNaN(cash)) {
    alert("Please enter a valid number");
    return;
  }

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDiv.innerText = "No change due - customer paid with exact cash";
    return;
  }

  const currencyUnits = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };

  const changeDue = parseFloat((cash - price).toFixed(2));
  let remaining = changeDue;

  const cidCopy = JSON.parse(JSON.stringify(cid)).reverse(); // high to low
  let changeArray = [];

  let totalCid = parseFloat(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));

  for (let [unit, amount] of cidCopy) {
    let unitVal = currencyUnits[unit];
    let amountAvailable = parseFloat(amount.toFixed(2));
    let amountToReturn = 0;

    while (remaining >= unitVal && amountAvailable > 0) {
      remaining = parseFloat((remaining - unitVal).toFixed(2));
      amountAvailable = parseFloat((amountAvailable - unitVal).toFixed(2));
      amountToReturn = parseFloat((amountToReturn + unitVal).toFixed(2));
    }

    if (amountToReturn > 0) {
      changeArray.push([unit, amountToReturn]);
    }
  }

  const totalReturned = parseFloat(
    changeArray.reduce((sum, [_, val]) => sum + val, 0).toFixed(2)
  );

  if (totalReturned < changeDue || remaining > 0) {
    changeDiv.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  if (totalReturned === totalCid) {
    const breakdown = changeArray.map(([unit, amt]) => `${unit}: $${amt}`).join(" ");
    changeDiv.innerText = `Status: CLOSED ${breakdown}`;
    return;
  }

  const breakdown = changeArray.map(([unit, amt]) => `${unit}: $${amt}`).join(" ");
  changeDiv.innerText = `Status: OPEN ${breakdown}`;
});
