
Object-Oriented Programming (OOP) — what it means in JS

Object-oriented programming is a programming paradigm organized around objects — bundles of state (data) and behaviour (functions) — and the relationships between them. In JavaScript, OOP is implemented in a hybrid way: it supports prototype-based object composition (every object can delegate to another object) and provides class syntax as a readable, standardized layer of sugar over prototypes. OOP concepts—encapsulation (hiding internal state), abstraction (exposing only necessary operations), inheritance (reusing and extending behavior), and polymorphism (different objects responding to the same message in different ways)—all apply in JS, but they map to language features differently than in classical class-only languages. In practice you design objects to expose clear APIs, reuse logic through prototype delegation or extends, and favor composition (objects containing other objects) when inheritance becomes complicated. JS’s dynamic nature (duck typing, first-class functions, closures) gives you many idioms for implementing OOP principles—some classical (classes, inheritance), some uniquely JavaScript (prototypes, closures for privacy, mixins).

Class (ES6 class) — what it is and how it works

A class in JavaScript is syntactic sugar introduced in ES2015 that makes defining constructor functions and prototype methods easier and clearer. Declaring class creates a constructor function and sets up the .prototype object for instance methods; methods declared inside the class body are non-enumerable and placed on the prototype (so they’re shared across instances). The class syntax supports constructor(...), static members (attached to the class constructor itself), subclassing with extends, and calling the parent constructor using super(...). Important subtlety: class is still prototype-based under the hood — class does not introduce a new OOP engine, it just streamlines prototype manipulation. Modern features include public instance fields, private fields (the #name syntax), computed method names, and static initialization blocks; all of these affect how you structure instance vs shared state and how you enforce encapsulation. Use class when you want readable, conventional object blueprints and prototype sharing; remember that methods on the prototype save memory compared to per-instance function properties.

Example:

class Person {
  #ssn;                       // private field (ES2020+)
  name;                       // public field (instance)
  static species = 'Homo sapiens'; // static property

  constructor(name, ssn) {
    this.name = name;
    this.#ssn = ssn;
  }

  greet() {                   // on prototype
    return `Hi, I'm ${this.name}.`;
  }

  get secret() { return this.#ssn; } // getter (access controlled)
}



Object — the runtime entity

An object is a collection of keyed values (properties), where values can be primitives, functions, or other objects. Each object has an internal link to another object called its prototype ([[Prototype]]), which is the mechanism JS uses for delegation: when you access a property, JS looks on the object first, then follows the prototype chain until it finds a match or reaches null. Objects are first-class — you can create them with object literals {}, Object.create(proto), constructor functions (via new), or class instances. Objects carry property attributes (writable, enumerable, configurable) and can have accessor properties (getters/setters) that look like fields but execute functions. Because functions are objects too, methods are just properties that happen to be callable. Key operations include Object.keys, Object.getOwnPropertyNames, Object.getPrototypeOf, Object.assign, and Object.freeze. Understand that methods created on the prototype are shared and more memory-efficient; per-instance function properties are unique to a single object and useful when you need closure-captured state or private behavior per instance.

Quick example:

const car = {
  make: 'Toyota',
  model: 'Corolla',
  start() { return `${this.make} ${this.model} started`; }
};

Constructor functions & prototypes — the pre-class model

Before class syntax, JS used constructor functions and prototypes. A constructor function is any function invoked with new: function Person(name) { this.name = name; }. When called with new, JS creates a fresh object whose prototype is Person.prototype, calls the function with this set to the new object, and (if the constructor doesn’t explicitly return an object) returns that object. Methods shared by all instances should be attached to Person.prototype, e.g. Person.prototype.greet = function(){...} — this ensures a single method object is reused. The prototype chain forms the object’s inheritance path. This model is still important to understand because class is just nicer syntax on top of it; many libraries and patterns use prototypes directly.


Constructor example:

function Animal(type) {
  this.type = type;
}
Animal.prototype.speak = function() {
  return `A ${this.type} makes a sound.`;
};
const a = new Animal('dog');



Inheritance — reuse and extension (prototype-based and extends)

Inheritance is the mechanism by which one object gains access to properties and methods of another. In JavaScript, inheritance is achieved by linking prototypes. With constructor functions you set the child prototype to an object created from the parent prototype (e.g., Child.prototype = Object.create(Parent.prototype) and Child.prototype.constructor = Child). With class syntax: class Dog extends Animal { constructor(...) { super(...); } }. extends sets up prototype delegation and allows calls to methods on parent via super.method(...). Inheritance supports method overriding: the child can define a method with the same name; runtime dispatch will pick the child’s method but it can call the parent's via super. JS does not support multiple inheritance of classes; mixins or composition pattern are used to simulate that. Use inheritance when there’s a clear "is-a" relationship and you want to share behavior; prefer composition when relationships are "has-a" or when you need flexible mixing of capabilities.

Example:

class Animal {
  constructor(type) { this.type = type; }
  speak() { return `${this.type} sound`; }
}
class Dog extends Animal {
  speak() { return `${this.type} barks`; } // override
}



Polymorphism — same message, different sounds

Polymorphism means code that works with objects of multiple types through a common interface. In JS, polymorphism is achieved by method overriding (subclasses implement the same method) and duck typing (if it walks like a duck and quacks like a duck, it's treated as a duck). For example, a function can call obj.draw() without caring whether obj is Circle, Square, or any other object that implements draw. This dynamic dispatch is automatic: the actual method invoked depends on the concrete object's prototype at runtime. Polymorphism encourages designing simple, consistent APIs rather than tightly coupling code to specific implementations.

Example:

function render(shape) { console.log(shape.draw()); }
// both Circle and Square implement draw()





Encapsulation — hiding implementation and controlling access

Encapsulation is about keeping internal state and implementation details hidden and exposing a clean API. JavaScript offers several options:
Private fields (#name): modern, lexical privacy enforced by the language. Accessible only inside the class body.
Closures / module pattern: put private data in a function scope (e.g., factory function or WeakMap) so only privileged methods can access it.
Symbol or WeakMap: using symbols or WeakMap keyed by instance to hold hidden data.
Conventions: leading underscore _private is only a convention and not enforced.

Encapsulation prevents external code from relying on internal details you might change later and provides invariants (e.g., validation in setters). Use getters/setters to control access and enforce constraints, and prefer private fields for true privacy when available.

Example (private #):

class Counter {
  #count = 0;
  increment() { this.#count++; }
  get value() { return this.#count; }
}



Abstraction — exposing simple interfaces

Abstraction means exposing a simple interface while hiding complex implementation details. In JS, you design modules/classes that let callers interact using a few well-named methods (APIs), while the implementation (data structures, algorithms, side effects) remains internal. A good abstraction reduces cognitive load and increases flexibility: you can change internals without breaking callers. Combine encapsulation (private fields or closures) with clear method naming, readme/docs, and small, focused APIs to achieve good abstraction.

Getters, Setters and Property Descriptors

Getters and setters (get foo() {} / set foo(v) {}) let you expose properties that run code when accessed or assigned, giving you validation, lazy computation, or computed properties while keeping property-like usage. Property descriptors (Object.defineProperty) give you control over enumerability, writability, and configurability. Use descriptors when building libraries that must precisely control property behavior (e.g., defining non-enumerable methods) and use getters/setters to present a clean property interface with internal logic.

Example:

class Person {
  constructor(first, last) { this.first = first; this.last = last; }
  get fullName() { return `${this.first} ${this.last}`; }
  set fullName(name) { [this.first, this.last] = name.split(' '); }
}



Static members and factory/static initialization

Static methods and properties (declared with static) belong to the class/constructor, not to instances. They are great for utility functions, factory methods, or cached data shared across instances. ES2022 added static initialization blocks for complex static setup. Use static members for behavior that isn’t tied to a specific instance.

Example:

class DB {
  static pool = createPool();
  static query(sql) { return DB.pool.query(sql); }
}



Prototype chain, instanceof, and Object.getPrototypeOf

Every object has a prototype (except Object.prototype whose prototype is null). The prototype chain is followed for property lookup. instanceof checks whether a constructor’s .prototype exists in an object’s prototype chain. Object.getPrototypeOf(obj) reveals the immediate prototype. hasOwnProperty checks for properties on the object itself (not inherited). Understanding prototype traversal is essential for debugging method lookup, method overriding, and why some properties appear on instances while others come from prototypes.

Example checks:

o = new Dog();
console.log(o instanceof Dog);              // true
console.log(o instanceof Animal);           // true (Dog extends Animal)
console.log(Object.getPrototypeOf(o) === Dog.prototype);



Mixins and composition — alternatives to deep inheritance

Because JS lacks multiple inheritance, you often use mixins (functions that copy/assign methods into a class prototype) or composition (objects composed of responsibilities) to share behavior. Mixins can be as simple as Object.assign(Class.prototype, { methodA() {...} }) or implemented as functions returning extended classes. Composition—giving an object a reference to another object that implements needed behavior—is usually preferable to deep inheritance because it reduces coupling and improves flexibility.

Mixin example:

const CanFly = {
  fly() { return `${this.name} is flying`; }
};
Object.assign(Bird.prototype, CanFly);


Composition example:

class Engine { start() {...} }
class Car { constructor(engine) { this.engine = engine; } start() { this.engine.start(); } }

Private data patterns (beyond #) — WeakMap and closures

Before private fields, developers used closures and WeakMap to keep per-instance private state. WeakMap allows you to map instances to private data without exposing it on the object itself. Closures inside factory functions hide variables entirely. #private is simpler and native, but WeakMap/closure patterns remain useful when you want privacy in environments without private fields or when writing libraries that must support older engines.

WeakMap example:

const priv = new WeakMap();
class Secret {
  constructor(secret) { priv.set(this, { secret }); }
  reveal() { return priv.get(this).secret; }
}

Method binding and this — pitfalls and solutions

this in JavaScript depends on call site: a method called as obj.method() gets this = obj, but extracting the method const fn = obj.method and calling fn() loses this. Arrow functions do not have their own this and capture the surrounding lexical this (useful in callbacks but usually not for prototype methods). Solutions: bind methods in the constructor (this.method = this.method.bind(this)), use arrow functions for instance properties (but this creates a new function per instance), or call with .call/.apply. Be mindful: binding per instance costs memory; prototype methods are lighter but require correct invocation.

Example:

class Button {
  handleClick = () => { console.log(this); } // instance arrow method bound to instance
}

Object cloning, immutability, and performance

Shallow copy: Object.assign({}, obj) or spread { ...obj }. Deep clone requires recursion or structuredClone (structuredClone(obj) in modern environments) or libraries. Immutable patterns (freeze, immutable libraries, pure functions) help avoid accidental shared-state bugs in complex apps. Performance: put shared methods on the prototype instead of per-instance to reduce memory. Avoid creating new functions inside tight loops or large numbers of objects.

Serialization and JSON

When you JSON.stringify an object, functions (methods) and symbol keys are dropped; only enumerable string-keyed data properties are serialized. If you need to serialize behavior, provide a toJSON() method to control the output. When designing classes, separate data (serializable) from behavior (reconstructed on deserialization) or provide factory methods that accept plain data and return full instances.


Design patterns commonly used with JS OOP

Module/Factory: closures for private state and factory functions returning objects.
Singleton: one shared instance (use a module that exports a single object).
Observer/Publisher-Subscriber: objects subscribe to events and are notified — common in UI code.
Factory Method/Abstract Factory: creating objects via factory functions rather than new scattered across code.
Decorator: dynamically add behavior to an object by wrapping it or using higher-order functions.
Patterns are tools — pick one when it solves a specific problem and helps readability and testability.


SOLID principles applied to JS

Single Responsibility: classes/modules should have one reason to change.
Open/Closed: design so behavior can be extended without modifying existing code (use composition, polymorphism).
Liskov Substitution: derived objects should be usable where base objects are expected.
Interface Segregation: prefer many small interfaces/APIs over one large monolith.
Dependency Inversion: high-level modules should depend on abstractions (functions, small interfaces) rather than concrete classes. In JS this often maps to passing dependencies as parameters or using factory injection.


Practical examples — small but complete

Animal base with polymorphism, private data, static factory, async method:

class Animal {
  #energy = 100;
  constructor(name) { this.name = name; }
  eat(amount) { this.#energy += amount; }
  get energy() { return this.#energy; }
  async rest(ms) { await new Promise(r => setTimeout(r, ms)); this.#energy += 10; }
  speak() { return `${this.name} makes a noise.`; }
  static create(name) { return new Animal(name); }
}

class Dog extends Animal {
  speak() { return `${this.name} barks.`; } // polymorphic override
}



Prototype-style inheritance example:

function Vehicle(type) { this.type = type; }
Vehicle.prototype.move = function() { return `${this.type} moving`; };

function Car(make) {
  Vehicle.call(this, 'car');
  this.make = make;
}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.move = function() { return `${this.make} car driving`; }; // override