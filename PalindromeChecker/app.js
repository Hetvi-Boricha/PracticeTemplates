let input = document.querySelector("#text-input");
let btn = document.querySelector("#check-btn");
let result = document.querySelector("#result");

btn.addEventListener("click",()=>{
    let original = input.value;

    if(original.trim() === "") {
        alert("Please input a value");
        return;
    }
    let cleaned = original.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    let reverse = original.split(' ').reverse().join(' ');
    if(cleaned=== reverse){
        result.innerText = `${original} is a palindrome`;
    } else {
        result.innerText = `${original} is not a palindrome.`;
    }
});