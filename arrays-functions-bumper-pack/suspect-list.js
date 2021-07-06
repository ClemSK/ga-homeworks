const suspects = [
  {
    name: 'James Moriarty',
    height: 170,
    shoeSize: 11,
    bloodType: 'A',
  },
  {
    name: 'Bender Bending Rodriguez',
    height: 170,
    shoeSize: 20,
    bloodType: 'Oil',
  },
  {
    name: 'Jean ValJean',
    height: 167,
    shoeSize: 12,
    bloodType: 'B',
    isTheStrongerManThanJavertByFar: true,
    isFrench: true,
  },
  {
    name: 'Nosferatu',
    height: 179,
    shoeSize: 14,
    bloodType: 'A',
    isUndead: true,
  },
  {
    name: 'Pascal Sauvage',
    height: 178,
    shoeSize: 9,
    bloodType: 'AB',
    isFrench: true,
  },
  {
    name: 'Irene Adler',
    height: 169,
    shoeSize: 7,
    bloodType: 'O',
  },
  {
    name: 'Sherlock Holmes',
    height: 169,
    shoeSize: 10,
    bloodType: 'B',
  },
  {
    name: 'Mickey Briggs',
    height: 176,
    shoeSize: 10,
    bloodType: 'B',
  },
  {
    name: 'Assane Diop',
    height: 183,
    shoeSize: 14,
    bloodType: 'A',
  },
  {
    name: 'Arsene Lupin',
    height: 177,
    shoeSize: 12,
    bloodType: 'A',
  },
  {
    name: 'Elizabeth Windsor',
    height: 153,
    shoeSize: 11,
    bloodType: 'A',
  },
]

// Someone's stolen the crown jewels and you're going to solve the case with JavaScript.

// Known facts:
//  the suspect seems to have cut their hand when breaking open the glass case, and type A blood was found
//  the suspect got away through a narrow window, forensics say that their height can be no more than 180cm tall
//  the suspect was able to reach the window apparently unaided so must be at least 155cm in height
//  a size 12 shoe print was left at the scene

// Use filter to narrow down the list of suspects.

// bloodTypeA
// max 180cm
// min 155cm
// 12 shoeSize

// function suspectCriteria (suspects) {
//   const bloodType = 'A'
//   const minHeight = height >= 155
//   const maxHeight = height <= 180
//   const shoeSize = 12
//   const filtered = suspects.filter(element => bloodType && shoeSize && minHeight && maxHeight)
// }
// console.log(filtered[i])

// return minHeight && maxHeight

// const bloodType = 'A'
// const maxHeight = suspects.height <= 180
// const minHeight = suspects.height >= 155
// const shoeSize = 12


// option
function suspectCritera (suspects) {
  const filtered = suspects.filter(suspect => suspect.bloodType === 'A' && suspect.shoeSize === 12 && suspect.height >= 155 && suspect.height <= 180)
  return filtered
}
console.log(suspectCritera(suspects))

// option 2
const filtered = suspects.filter(suspect => suspect.bloodType === 'A' && suspect.shoeSize === 12 && suspect.height >= 155 && suspect.height <= 180)
console.log(filtered)

// const isAtLeastFour = fruit.length >= 4
//     const isAtMostSix = fruit.length <= 6 
//     return isAtLeastFour && isAtMostSix 