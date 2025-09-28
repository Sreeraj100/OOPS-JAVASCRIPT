// Polymorphism = same method name, but different behavior

// Polymorphism means same interface, different implementations.
// Allows objects of different types to be treated in the same way, but behave differently.

class Bird {
  speak() {
    console.log("Bird is making a sound.")
  }
}

class Parrot extends Bird {
  speak() {
    console.log("Parrot says: hahaha")
  }
}

class Crow extends Bird {
  speak() {
    console.log("Crow says: kakakaa")
  }
}


const birds = [new Bird(), new Parrot(), new Crow()];

// All objects have "speak" but each behaves differently
birds.forEach(bird => bird.speak())

// Output:
// Bird is making a sound.
// Parrot says: hahaha
// Crow says: kakakaa

