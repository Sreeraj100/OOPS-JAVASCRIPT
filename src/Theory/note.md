1. What is OOP in JavaScript?

Object-Oriented Programming (OOP) is a programming paradigm based on the idea of organizing software around objects. In JavaScript, an object is a collection of properties and behaviors, and OOP focuses on structuring programs in terms of these entities. Unlike languages such as Java or C++, JavaScript is prototype-based, meaning objects inherit features directly from other objects instead of through rigid class hierarchies. With the introduction of the class syntax in ES6, JavaScript developers gained a familiar way of writing OOP code, though internally it still relies on prototypes. The four core principles of OOP—encapsulation, abstraction, inheritance, and polymorphism—are all supported in JavaScript, but they often look slightly different due to the dynamic and flexible nature of the language. This makes OOP in JavaScript both powerful and adaptable, giving developers multiple approaches to design scalable and maintainable systems.

2. Class

A class in JavaScript is a syntactic template for creating objects that encapsulate both data and behavior. Classes provide a cleaner, more readable way to define constructor functions and prototypes, which were previously the main method of achieving OOP in JavaScript. When you declare a class, it defines how instances of that class are created and what properties and methods they will have. Classes support constructors for initializing object state, instance methods for shared behaviors, static methods for functionality tied to the class itself, and private fields for true encapsulation. Importantly, classes are not a new mechanism—they are syntactic sugar over the existing prototype system, which means methods defined in a class body are actually placed on the prototype of the created objects. This balance of readability and prototype efficiency makes classes the most common way to implement OOP in modern JavaScript.

3. Object

An object in JavaScript is the most fundamental building block of OOP. It represents a single entity that bundles together properties (data) and methods (behavior). Each object has an internal prototype link that enables property lookup across a chain of objects, known as the prototype chain. Objects can be created in many ways: through object literals, the Object.create method, constructor functions, or by instantiating classes. Objects are dynamic, meaning you can add or remove properties at runtime, and each property can have attributes such as enumerability, configurability, and writability. Objects in JavaScript can also define accessors—getters and setters—that allow controlled interaction with internal state. Because functions are also objects, they can serve as methods within other objects, making behavior and state tightly integrated.

4. Constructor Functions and Prototypes

Before classes were introduced, constructor functions were the main way to create reusable object templates in JavaScript. A constructor function is a normal function intended to be called with the new keyword, which automatically creates a new object, links it to the constructor’s prototype, and assigns this to refer to that object during initialization. To avoid duplicating methods across instances, developers attach shared methods to the constructor’s prototype, which all created objects delegate to. This forms the basis of prototype-based inheritance. Even though the modern class syntax is now preferred for readability, understanding constructor functions and prototypes is essential because they reveal how OOP actually works internally in JavaScript.

5. Inheritance

Inheritance is the principle of creating new objects or classes that reuse and extend the behavior of existing ones. In JavaScript, inheritance is prototype-based: objects inherit directly from other objects via the prototype chain. With the class syntax, inheritance is made explicit through the extends keyword, which sets up the prototype relationship between parent and child classes. The child can override or extend methods from the parent, and it can call the parent’s constructor or methods using super. While inheritance is a powerful way to share behavior, JavaScript emphasizes flexibility, and developers are often encouraged to use composition (where objects contain other objects) rather than deep inheritance hierarchies, since composition tends to be more maintainable and less rigid.

6. Polymorphism

Polymorphism allows different objects to respond to the same method or operation in their own unique way. In JavaScript, polymorphism is achieved mainly through method overriding, where a subclass provides its own implementation of a method defined in the parent class. When a method is called on an object, JavaScript dynamically determines which version to execute based on the actual object at runtime. Another form of polymorphism common in JavaScript is duck typing, where objects are treated according to their capabilities rather than their explicit type. For example, any object that implements a draw method can be passed to a rendering function, regardless of its class. This flexibility makes polymorphism a powerful tool for designing extensible systems.

7. Encapsulation

Encapsulation is the practice of restricting direct access to the internal state of an object and only exposing controlled ways to interact with it. JavaScript provides several mechanisms for encapsulation. Modern versions support private class fields, which are prefixed with a hash symbol and cannot be accessed outside the class body. Historically, developers used closures and WeakMaps to achieve privacy by keeping variables hidden in a function’s scope. Another common, though unenforced, practice is to use naming conventions like prefixing private fields with an underscore. Encapsulation ensures that objects maintain consistent states, prevents accidental external modifications, and allows the internal implementation to change without breaking the public interface.

8. Abstraction

Abstraction focuses on simplifying complexity by exposing only essential details while hiding the inner workings of an object. In JavaScript, abstraction is achieved by designing classes or modules with clear, minimal interfaces. For instance, a database class may expose only connect and query methods, while hiding the low-level networking logic. Abstraction is closely related to encapsulation but is more about design philosophy: encapsulation hides the data, while abstraction hides the complexity. Good abstraction makes code easier to use, maintain, and extend, because developers can rely on a stable, simple interface while the implementation details remain flexible.

9. Getters, Setters, and Property Descriptors

JavaScript supports accessor properties, which are defined using getters and setters. A getter is a special method that runs when a property is accessed, and a setter runs when a property is assigned. This allows developers to treat methods as if they were fields while still controlling access and validation behind the scenes. Beyond accessors, JavaScript also supports property descriptors, which define low-level metadata about object properties, such as whether they are writable, enumerable, or configurable. This fine-grained control makes it possible to design objects with carefully managed behaviors, ensuring data integrity and preventing accidental misuse.

10. Static Members

Static members are properties and methods that belong to the class itself rather than to its instances. They are often used for utility functions, configuration, or shared resources that do not depend on individual objects. Because static members are tied to the class, they can be accessed without creating an instance. This makes them useful for defining factory methods, constants, or helper functions. In modern JavaScript, static initialization blocks can also be used to perform complex one-time setup for static properties. Static members provide a way to organize functionality that logically belongs to a class but not to any specific object created from it.

11. Prototype Chain and Reflection

At the core of JavaScript’s OOP model is the prototype chain. Every object has an internal reference to another object called its prototype, and property lookups traverse this chain until the property is found or the end of the chain (null) is reached. This mechanism underpins inheritance and method sharing. JavaScript also provides reflection tools through the Object and Reflect APIs, which allow developers to inspect and manipulate objects at runtime. With these, you can check an object’s prototype, list its own properties, define new properties with descriptors, or intercept behavior using proxies. This reflective capability makes JavaScript extremely dynamic compared to many other OOP languages.

12. Mixins and Composition

Since JavaScript does not support multiple inheritance, developers often rely on mixins and composition to share behavior across unrelated classes. A mixin is a pattern where methods from one object are copied into another, effectively "mixing in" additional capabilities. Composition, on the other hand, involves constructing objects from smaller, reusable components rather than extending from a parent. For example, a car object might be composed of an engine object and a wheel object, each responsible for their own behaviors. These patterns are often preferred over deep inheritance because they encourage modular, flexible, and maintainable code.

13. Symbols and Privacy

Symbols are a unique and immutable primitive type in JavaScript often used as property keys. Because symbols are guaranteed to be unique, they allow developers to define object properties that will not accidentally collide with others. They can also be used to create semi-private properties, as symbol keys are not easily accessible during normal property enumeration. Additionally, JavaScript defines well-known symbols such as Symbol.iterator, which let objects define custom iteration behaviors. Symbols add another dimension to OOP design by giving developers a way to customize and safeguard object behavior.

14. Proxies and Meta-Programming

Proxies are advanced objects that allow developers to intercept and redefine fundamental operations performed on other objects, such as property access, assignment, or function invocation. With proxies, you can enforce validation, log operations, implement dynamic properties, or even simulate features like multiple inheritance. Proxies are part of JavaScript’s meta-programming capabilities, which make the language highly adaptable. Together with reflection APIs, proxies enable the creation of objects whose behavior is programmable at a very deep level, going beyond what is possible in many traditional OOP languages.

15. Abstract Classes and Interfaces (Workarounds)

JavaScript does not natively support abstract classes or interfaces like strongly typed OOP languages do. However, developers can simulate abstract classes by creating base classes that define methods which throw errors if not implemented by subclasses. Similarly, interfaces can be approximated through duck typing—objects are considered valid as long as they implement the required methods. For stricter enforcement, TypeScript builds on JavaScript to provide actual interfaces and abstract classes at the type-checking level. Understanding these workarounds helps in designing systems that require structured contracts without abandoning the flexibility of JavaScript.

16. OOP vs Functional Programming in JavaScript

JavaScript is a multi-paradigm language, meaning it supports both OOP and functional programming (FP). While OOP emphasizes modeling entities as objects, FP emphasizes composing pure functions that transform data. In practice, many JavaScript programs combine both paradigms: OOP for structuring applications around stateful objects and FP for data transformation tasks. Developers must understand when each style is more effective. OOP often excels in modeling real-world entities and managing complex state, while FP often shines in tasks that involve predictable data transformations and immutability. The ability to switch between paradigms is one of JavaScript’s greatest strengths.

17. Common Pitfalls in JavaScript OOP

While powerful, OOP in JavaScript has some common pitfalls. Forgetting to use new with a constructor can lead to bugs, as this may become undefined in strict mode or reference the global object otherwise. Overusing inheritance can result in rigid, fragile hierarchies, making composition a safer choice in many cases. Placing mutable objects on prototypes can unintentionally share state across instances. Misunderstanding how this works—especially when extracting methods or using arrow functions incorrectly—can also lead to subtle bugs. Recognizing these pitfalls and designing around them is essential for effective OOP in JavaScript.