// Class is a blueprint for creating objects


class Car {
  constructor(brand, color) {
    this.brand = brand // property
    this.color = color // property
  }

  // Method - behavior of object
  drive() {
    console.log(`${this.brand} is driving`)
  }
}

// Creating objects (instances)

const car1 = new Car("Tesla", "Red")
const car2 = new Car("BMW", "Blue")

car1.drive() // Tesla is driving
car2.drive() // BMW is driving
