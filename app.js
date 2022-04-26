const inptCont = document.querySelectorAll(".input-cont");
const inptLeft = document.querySelector(".inpt-left");
const inptRight = document.querySelector(".inpt-right");
const inpt = document.querySelectorAll(".inpt");
const leftList = document.querySelectorAll(".nav-left");
const rightList = document.querySelectorAll(".nav-right");
const bttmValueLeft = document.querySelector(".inpt-left-bttm");
const bttmValueRight = document.querySelector(".inpt-right-bttm");
const leftSlctList = document.querySelector(".list2")
const rightSlctList = document.querySelector(".list3")


function getLeftData(from, to, inpt1, inpt2){
    inpt1.value = inpt1.value.replace(/,/, ".")
    if(isNaN(inpt1.value)){
        inpt2.value = "Invalid data"
        return;
    }

    if(from != to){
        fetch(`https://api.exchangerate.host/latest?base=${to}&symbols=${from}`)
        .then(res => res.json())
        .then(data => {
            inpt2.value = (inpt1.value / data.rates[from]).toFixed(4);
            bttmValueLeft.textContent = `1 ${from} = ${(1 / data.rates[from]).toFixed(4)} ${to}`
            bttmValueRight.textContent = `1 ${to} = ${(data.rates[from]).toFixed(4)} ${from}`
        })
        .catch(err => alert("Error: " + err))
    }
    else{
        inpt2.value = inpt1.value;            
        bttmValueLeft.textContent = `1 ${from} = 1 ${to}`;
        bttmValueRight.textContent = `1 ${to} = 1 ${from}`;
    }
}


inptLeft.value = "10";
getLeftData('RUB', 'USD', inptLeft, inptRight)

function deleteLeftClass(){
    leftList.forEach(el => {
        el.classList.remove(`nav-left-btn-active`);
    })
}

function deleteRightClass(){
    rightList.forEach(el => {
        el.classList.remove(`nav-right-btn-active`);
    })
}

leftList.forEach(element => {
    element.addEventListener("click", (event) => {
        deleteLeftClass();
        event.target.classList.add("nav-left-btn-active");
        getLeftData(event.target.textContent,
             document.querySelector(".nav-right-btn-active").textContent, inptLeft, inptRight)
    })
})

rightList.forEach(element => {
    element.addEventListener("click", (event) => {
        deleteRightClass();
        event.target.classList.add("nav-right-btn-active");
        getLeftData(document.querySelector(".nav-left-btn-active").textContent, 
        event.target.textContent, inptRight, inptLeft)        
    })
})

 inptLeft.addEventListener("keyup", () => {
     getLeftData(document.querySelector(".nav-left-btn-active").textContent, 
     document.querySelector(".nav-right-btn-active").textContent, inptLeft, inptRight)
 })

 inptRight.addEventListener("keyup", () => {
    getLeftData(document.querySelector(".nav-right-btn-active").textContent, 
    document.querySelector(".nav-left-btn-active").textContent, inptRight, inptLeft)
})