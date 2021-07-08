/*
Create an object that defines a laptop. It should have the following properties:

make (string)
model (string)
ram (number)
storage (number)
*/

const laptop = {
  make: 'apple',
  model: 'macbook',
  ram: 8,
  storage: 256
};

/*
Create an object that defines a bottle of wine. It should have the following properties:

name (string)
grape (string, eg: Merlot)
vintage (number, eg: 2017)
volume (number, eg: 750)
amountRemaining (number, eg: 750)

It should have the following methods:

drink(amount) - removes the `amount` from the `amountRemaining`
refill(amount) - adds the `amount` to the amountRemaining

*/

const wineBottle = {
  name: 'table wine', 
  grape: 'merlot',
  vintage: 1990, 
  volume: 750,
  amountRemaining: 750,
  drink(amount){
    this.amountRemaining -= amount
  },
  refill(amount){
    this.amountRemaining += amount

  }
}

/*
write a Product class that has the following properties:

name (string)
description (string)
price (number)
*/

class Product {
  constructor(name, description, price) {
    this.name = name
    this.description = description
    this.price = price
  }
  item() {
    console.log(`This ${this.name} is a ${this.description} and costs ${this.price}`)
  } 
}

const tomatos = new Product('Vine Tomato', 'from Italy', 0.50)
console.log('I am the Vine Tomato object', tomatos)
tomatos.item()


/*
Write a Cart class that has the following properties:

contents (array)

and the following methods:

addItem(item) - adds the given item into the contents array
removeItem(item) - removes the given item from the contents array
empty() - removes all items from the contents array
getTotal() - returns the total price of all items in the contents array
*/

class Cart {
  constructor (item) {
    this.contents = [] 
    this.item = item
  }
  addItem(item) {
    this.contents.push(item)
  }
  removeItem(itemToRemove) {
    this.contents = this.contents.filter(item => item != itemToRemove)
  }
  empty() {
    return this.contents = []
  }
  getTotal() { // how to access the price property inside the object from the product? 
    this.contents = this.contents.reduce((a, b) => a + b, 0)
    console.log(this.contents) 
  } // consol.log() returns: 0[object Object][object Object][object Object]
}



/*
Write a Shape class that has the following properties:

width (number)
height (number)

and the following methods:

getArea() - calculates the area of the shape
getPerimeter() - calculates the total length of all sides of the shape
*/

class Shape {
  constructor(width, height) {
    this.width = width
    this.height = height
  }
  getArea() {
    const area = this.width * this.height
    return area
  }
  getPerimeter() {
    const perimeter = 2 * (this.width + this.length)
    return perimeter // Not sure why I'm getting a return value of NaN? 
    // The calculation is very similar to the area calculation
  }
}



// ! please do not alter below ✋

module.exports = {
  laptop,
  wineBottle,
  Product,
  Cart,
  Shape
}
