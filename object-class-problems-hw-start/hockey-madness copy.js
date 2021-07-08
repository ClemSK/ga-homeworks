// This is a class
class GlovesOff {
    // Classes always have constructors
    constructor(name, moves, maxHitPoints) {
      this.name = name
      this.moves = moves
      this.hitPoints = maxHitPoints
      this.maxHitPoints = maxHitPoints
    }
    // Classes can have extra methods
    kockedDown() {
      // we can refer to the instance of the class (the one we constructed) with the `this` keyword
      return this.hitPoints <= 0
    }
    toString() {
      return `${this.name} (${this.hitPoints}/${this.maxHitPoints})`
    }
    takeDamage(hit) {
      this.hitPoints -= hit
    }
    useMoveAgainstOpponent(index, opponent) {
      const move = this.moves[index]
      console.log(
        `${this.name} used ${move.name.toUpperCase()} against ${opponent.name}!`
      )
      opponent.takeDamage(move.hit)
      console.log(opponent.toString())
    }
  }
  
  // We can extend hockeyMadness with a specific species
  class TampaBayLightningPlayer extends GlovesOff {
    constructor(moves, maxHitPoints) {
      super('Pat "Big Rig" Maroon', moves, maxHitPoints)
    }
  }
  
  const myOspfa = new PatMaroon(
    [
      { name: 'Fist of Doom', hit: 50 },
      { name: 'Body Slam', hit: 30 },
      { name: 'Slash', hit: 25 },
    ],
    50
  )
  // or we can use the main class
  const theirOspfa = new WhinyMontrealCanadien(
    'Whiny Montreal Canadien Player',
    [
      { name: 'Complain', hit: 10 },
      { name: 'Blame the ref', hit: 5 },
      { name: 'Give up', hit: 1 },
    ],
    60
  )
  
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  
  console.log(' Player One Ospfa '.padStart(30, '=').padEnd(40, '='))
  console.log(myOspfa)
  console.log(' Player Two Ospfa '.padStart(30, '=').padEnd(40, '='))
  console.log(theirOspfa)
  
  function promptUserForMove(player, opponent) {
    rl.question(
      `Which move would you like ${player.toString()} to use against ${opponent.toString()}?
  Options are:
    ${player.moves.map(({ name }, i) => `${i}. ${name}`).join('\n  ')}
  Indicate 0-${player.moves.length - 1}.
  > `,
      function (index) {
        // The user has chosen a move — we'll now perform that move.
        player.useMoveAgainstOpponent(index, opponent)
  
        if (opponent.kockedDown()) {
          // If the opponent has fainted, we win
          console.log(
            `${player.toString()} sufficiently injured ${opponent.toString()}!`
          )
        } else {
          // If the opponent hasn't fainted, they can now move
          promptUserForMove(opponent, player)
        }
      }
    )
  }
  
  promptUserForMove(myOspfa, theirOspfa)