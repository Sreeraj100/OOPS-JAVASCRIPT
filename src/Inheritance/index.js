// Inheritance allows one class (child) to reuse properties and methods of another class (parent).
// Promotes code reuse and hierarchy modeling.

// Key points:

// extends keyword: Makes a class inherit from another.
// super() function: Calls the parent’s constructor.

class Animal {
  constructor(name) {
    this.name = name
  }

  eat() {
    console.log(`${this.name} is eating.`)
  }
}

// Dog inherits from Animal using extends

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // call parent constructor
    this.breed = breed
  }

  bark() {
    console.log(`${this.name} the ${this.breed} is barking!`)
  }
}

// Example usage
const dog1 = new Dog("Rocky", "German Shepherd")
dog1.eat()   // Rocky is eating. (from parent class)
dog1.bark()  // Rocky the German Shepherd is barking! (from child class)
