function init() {
  
  function buttonClick(event) {  
  const choices = ["Rock", "Paper", "Scisors"]; 
  const randomIndex = Math.floor(Math.random() * choices.length); // math.floor and math.random are used to return a random integer between 2 bounds. - The length property of an object which is an instance of type Array sets or returns the number of elements in that array. multiplying the random number with the number of elements in the array will return the result and also limit the number of options available as teh array is set to a max of 2. 
  computer.currentChoice = choices[randomIndex]; // computer accesses currentChoice and sets it to a choice in the array that is made random giving an element of unpredictability to the game. 
  
    // converts id to index
    if (event.target.id === "rock") { // the event-object (click) is set to target the ID of the button that the player selected and linking them to items in the array through an if function. 
      player.currentChoice = choices[0];
    } else if (event.target.id === "paper") {
      player.currentChoice = choices[1];
    } else {
    player.currentChoice = choices[2];
    }
  
  // Tests for a tie
  
  if (computer.currentChoice === player.currentChoice) { // using an if function if the player and computer make the same choice then the result will retun a tie message. 
    document.getElementById("results").innerText = 
      "It's a tie!" // here we don't need to use both player and computer results. it's only if the player matches the computer therefore we use the computer's choice. 
      
      document.getElementById("computer").innerText =
      "Computer choice: " + computer.currentChoice

      document.getElementById("player").innerText =
      "Player choice " + player.currentChoice;
  
    }
      
   // Selecting a winner
    else if(computer.currentChoice === choices[0]) { // if the computer chooses Rock
      if(player.currentChoice === choices[1]) { // and player selects Paper
        document.getElementById("results").innerText =  
          "The player wins!" 

          document.getElementById("computer").innerText =
          "Computer choice: " + computer.currentChoice

          document.getElementById("player").innerText =
          "Player choice " + player.currentChoice;

      } else {
        document.getElementById("results").innerText = 
          "The computer wins!" 
          
          document.getElementById("computer").innerText =
          "Computer choice: " + computer.currentChoice
          
          document.getElementById("player").innerText =
          "Player choice: " + player.currentChoice;
      }
    } else if (computer.currentChoice === choices[1]) { // if the computer chooses Paper 
      if (player.currentChoice === choices[2]) { // and the player selects Scisors
        document.getElementById("results").innertext = 
          "The player wins!" 
          
          document.getElementById("computer").innerText =
          "Computer choice: " + computer.currentChoice
          
          document.getElementById("player").innerText =
          "Player choice: " + player.currentChoice;
          
      } else { // Not sure why when player chooses paper and computer chooses scisors, player wins? 
        document.getElementById("results").innerText = 
          "The computer wins!" 

          document.getElementById("computer").innerText =
          "Computer choice: " + computer.currentChoice
          
          document.getElementById("player").innerText =
          "Player choice: " + player.currentChoice;
      }
    }else if (computer.currentChoice === choices[2]) { // if the player chooses Scisors and the computer chooses paper it's a tie 
        document.getElementById("results").innerText = 
          "The player wins!" 
          
          document.getElementById("computer").innerText =
          "Computer choice: " + computer.currentChoice
          
          document.getElementById("player").innerText =
          "Player choice: " + player.currentChoice;

      } else { // the options have been run through so there is no need to add an alternate option. 
        document.getElementById("results").innerText = 
        "The computer wins!"

        document.getElementById("computer").innerText =
          "Computer choice: " + computer.currentChoice
          
          document.getElementById("player").innerText =
          "Player choice: " + player.currentChoice;
      }  

      const hoverButton = document.querySelectorAll("input") // what am I selecting? input buttons
      const buttonColor = document.querySelector('#button-color-span')

      const handleMouse//Over = (event) => {
        console.log('the mouse is over the button', event.target)
        if (event.target.input === billUrl) {
          event.target.src = nickUrl
        } else if (event.target.src === nickUrl) {
          event.target.src = billUrl
        }
      }

      const button = document.querySelector('#button')
      const buttonColorText = document.querySelector('#button-color-span')
      
      
      function handleMouseOver(event) {
        console.log(event)
        button.classList.hover('inputWhite')
        buttonColorText.textContent = event.target.classList.contains('inputRed')
        ? 'inputWhite'
        : 'inputRed'
      
        // buttonColorText.textContent = buttonColorText.textContent === 'red' ? 'blue' : 'red'
        // can also be coded as event.target.classList.toggle('button-class-blue')
      }
      
      hoverButton.addEventListener("mouseenter", handleMouseOver)
      hoverButton.addEventListener("mouseleave", handleMouseLeave)
      

  const reset = document.querySelector('#reset-btn')
  reset.addEventListener("click", handleReset)

  function handleReset(event){
      // need to reset player position, computer position and reset the message to default
      // need to add an event listener to handle the click
      // would it work as a loop? cycliing through by assigning value and thn resetting? 
    event.preventDefault()
    // event.target.id === "input" 
    document.getElementById("results").innerText = ""
    document.getElementById("player").innerText = ""
    document.getElementById("computer").innerText = ""
    // buttonReset.IdName = 'reset-btn'
    // buttonReset.innerHTML = 'Reset!'
}

}



  // click event handlers

  document.getElementById("rock").addEventListener("click", buttonClick); // here we call the functions so that the player can interact with the game.
  document.getElementById("paper").addEventListener("click", buttonClick);
  document.getElementById("scisors").addEventListener("click", buttonClick);

}

  // ! do not touch below here
window.addEventListener('DOMContentLoaded', init)

