// Abstraction means hiding the complex details of how something works and only showing the essential features that we need to use.
// In JS, we can simulate abstraction using abstract base classes or interfaces (not built-in, but done via conventions).

class CoffeeMachine {
  #waterAmount = 0

  fill(amount) {
    if (amount <= 0) throw new Error("Amount must be positive!")
    this.#waterAmount += amount
  }

  // abstraction: user just sees "makeCoffee"
  makeCoffee() {
    if (this.#waterAmount < 10) {
      throw new Error("Not enough water!")
    }
    return "Coffee ready"
  }
}


const machine = new CoffeeMachine()
machine.fill(20)
console.log(machine.makeCoffee()) // User doesn't know how it works
