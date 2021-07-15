function init() {
  function buttonClick(event) {  
    const choices = ["Rock", "Paper", "Scissors"]; 
    const randomIndex = Math.floor(Math.random() * choices.length); // math.floor and math.random are used to return a random integer between 2 bounds. - The length property of an object which is an instance of type Array sets or returns the number of elements in that array. multiplying the random number with the number of elements in the array will return the result and also limit the number of options available as teh array is set to a max of 2. 
    let playerChoice = ''
    const computerChoice = choices[randomIndex]; // computer accesses currentChoice and sets it to a choice in the array that is made random giving an element of unpredictability to the game. 
    // converts id to index
    if (event.target.id === "rock") { // the event-object (click) is set to target the ID of the button that the player selected and linking them to items in the array through an if function. 
      playerChoice = choices[0];
    } else if (event.target.id === "paper") {
      playerChoice = choices[1];
    } else {
      playerChoice = choices[2];
    }
    // Tests for a tie
    if (computerChoice === playerChoice) { // using an if function if the player and computer make the same choice then the result will retun a tie message. 
      document.getElementById("results").innerText = 
      "It's a tie!" // here we don't need to use both player and computer results. it's only if the player matches the computer therefore we use the computer's choice. 
      document.getElementById("computer").innerText =
      "Computer choice: " + computerChoice
      document.getElementById("player").innerText =
      "Player choice " + playerChoice;
    }
    // Selecting a winner
    else if (( computerChoice === choices[0] && playerChoice === choices[2])
            || (computerChoice === choices[1] && playerChoice === choices[0]) 
            || (computerChoice === choices[2] && playerChoice === choices[1]) 
            ){ // when the computer wins
      document.getElementById("results").innerText = 
          "The computer wins!" 
      document.getElementById("computer").innerText =
          "Computer choice: " + computerChoice
      document.getElementById("player").innerText =
          "Player choice: " + playerChoice;
    } else { // when the player wins
      document.getElementById("results").innerText = // but that's not right. 
          "The player wins!" 
      document.getElementById("computer").innerText =
          "Computer choice: " + computerChoice
      document.getElementById("player").innerText =
          "Player choice: " + playerChoice;
    } 
    const hoverButton = document.querySelectorAll("input") // what am I selecting? input buttons
    const handleMouseEnter = (event) => {
      console.log('the mouse is over the button', event.target)
      event.target.className = 'inputRed' 
    }
    const handleMouseLeave = (event) => {
      console.log('the mouse is not over the button', event.target)
      event.target.className = 'inputDefault'
    }
    hoverButton.forEach(function(input){
      input.addEventListener("mouseenter", handleMouseEnter)
      input.addEventListener("mouseleave", handleMouseLeave)
    })
    const reset = document.querySelector('#reset-btn')
    reset.addEventListener("click", handleReset)
    function handleReset(event){
      document.getElementById("results").innerText = ""
      document.getElementById("player").innerText = ""
      document.getElementById("computer").innerText = ""
    }
  }
  // click event handlers
  document.getElementById("rock").addEventListener("click", buttonClick); // here we call the functions so that the player can interact with the game.
  document.getElementById("paper").addEventListener("click", buttonClick);
  document.getElementById("scissors").addEventListener("click", buttonClick);
}
// ! do not touch below here
window.addEventListener('DOMContentLoaded', init)