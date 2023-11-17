let btnRef = document.querySelectorAll(".butt-opt");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("newGAME");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
// winning pattern array
let winningPattern = [[0,1,2], [0,3,6], [1,4,7], [2,5,8], [3,4,5], [6,7,8], [0,4,8], [2,4,6]] ;

//X play first
let xTurn = true;
let count = 0;

// disable all buttons
const disabledButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //enable popup
    popupRef.classList.remove("hide");
}

//enable all buttons  (for new game and restart) 
const enableButtons = () => {
    btnRef.forEach(element => {
        element.innerText = "";
        element.disabled = false;
    });
    //disable popup
    popupRef.classList.add("hide");
};

// this functiob is executed when a player wins
const winFunction = (letter) =>{
    disabledButtons();
    if(letter == "X"){
        msgRef.innerHTML = "&#x1F389; <br> Player X Wins";
    }
    else{
        msgRef.innerHTML = "&#x1F389; <br> Player O Wins";
    }
};

//function for draw
const drawFunstion = () => {
    disabledButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

//new game
newgameBtn.addEventListener("click", () =>{
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});


//winning logic
const winChecker = () => {
    //loop through all win pattern
    for(let i of winningPattern){
        let[element1, element2, element3] = [
            btnRef[i[0]].innerText, 
            btnRef[i[1]].innerText, 
            btnRef[i[2]].innerText
        ];
        //check if elemets are filled
        //if 3 empty  elemets are same and would give win as would
        if(element1 != "" && element2 != "" && element3 != ""){
            if(element1 == element2 && element2 == element3){
                //if all 3 buttons are same then win
                winFunction(element1);
            }
        }
    }
}

//display on click
btnRef.forEach((element)=>{
    element.addEventListener("click", () => {
        if(xTurn){
            xTurn = false;
            //display x
            element.innerText = "X";
            element.disabled = true;
        }
        else{
            xTurn = true;
            //display o
            element.innerText = "O";
            element.disabled = true;
        }
        //increment count on each click
        count += 1;
        if(count == 9){
            // its a draw since there is total 9 box
            drawFunstion();
        }
        //check for win on every click
        winChecker();
    });
});

//enable buttons and disabble popup on page load
window.onload = enableButtons;