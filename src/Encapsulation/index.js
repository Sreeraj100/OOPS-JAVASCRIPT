// ⚫Encapsulation means hiding internal details of an object and exposing only what is necessary.
// ⚫Helps protect data from being accessed or modified directly.

// ⚫JS Features for Encapsulation
// ⚫Private fields (#): Only accessible inside the class.

// ⚫Getters and Setters: Control read/write access.
// ⚫Private fields are truly hidden from outside.
// ⚫Encapsulation ensures data integrity and prevents accidental changes.



class BankAccount {
 
  #balance

  constructor(owner, initialBalance) {
    this.owner = owner
    this.#balance = initialBalance
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount
      console.log(`Deposited ${amount}. New Balance: ${this.#balance}`)
    } else {
      console.log("Deposit amount must be positive")
    }
  }

  
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount
      console.log(`Withdrew ${amount}. Remaining Balance: ${this.#balance}`)
    } else {
      console.log("Invalid withdraw amount")
    }
  }

  // Getter method read-only access to private balance
  getBalance() {
    return this.#balance
  }
}

// Example usage
const account = new BankAccount("Sreeraj", 1000)
account.deposit(500)        // Deposited 500. New Balance: 1500
account.withdraw(200)        // Withdrew 200. Remaining Balance: 1300
console.log(account.getBalance()) // 1300
// console.log(account.#balance)
// ❌ Direct access is not allowed: console.log(account.#balance)
