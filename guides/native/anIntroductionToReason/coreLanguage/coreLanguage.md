# Core Language

This is quick overview of the Reason Language.

Follow along by running the Reason REPL and typing the commands into the repl

```bash
npm run top
```

After running the previous command you should see the following:

```reason
──────────────┬──────────────────────────────────────────────────────────────┬──────────────
│ Welcome to utop version 1.19.2 (using OCaml version 4.02.3)! │
└──────────────────────────────────────────────────────────────┘
Reason: Meta Language Utility
___ _______ ________ _ __
/ _ \/ __/ _ | / __/ __ \/ |/ /
/ , _/ _// __ |_\ \/ /_/ / /
/_/|_/___/_/ |_/___/\____/_/|_/

Execute statements/let bindings. Hit <enter> after the semicolon.

> let myVar = "Hello Reason!";
> let myList: list string = ["first", "second"];

Type #utop_help for help about using utop.
```

If you see this everything is working great! If not please consult [Get Up & Running.](/get_up_and_running.md)

To exit the REPL, type `ctrl + d`

# Values

## Strings

```reason
Reason # "hello";
- : string = "hello"

Reason # "Hello, " ^ "from Reason";
- : string = "Hello, from Reason"
```

Reason uses the `^` operator to put strings together.

## Numbers

```reason
Reason # 2 + 3 * 4;
- : int = 14

Reason # (2 + 3) * 4;
- : int = 20
```

Reason makes a distinction between integers and floating point numbers. Unlike some other languages, Reason won't automatically convert integer literals to floats, you must explicitly write them with a decimal point as seen below. There is both floating point division `/.` and integer division `/` . The same convention goes for the other arithmetic operators.

```reason
Reason # 9.0 /. 2.0;
- : float = 4.5

Reason # 9/2;
- : int = 4
```

## Functions

```reason
Reason # let isNegative n => n < 0;
let isNegative : int => bool = <fun>

Reason # isNegative 4;
- : bool = false

Reason # isNegative (-7);
- : bool = true

Reason # isNegative (-3 * -4);
- : bool = false
```

In reason to invoke/call a function you can simply choose to use parenthesis or omit/ignore them. Whichever one you prefer to use. The first piece of code we entered to define isNegative returns the type definition of the function. We will get into type definitions later in this guide.

```reason
Reason # let sum2 a b => a + b;
let sum2 : int => int => int = <fun>

Reason # sum2 1 2;
- : int = 3

Reason # sum2 1 (sum2 2 3);
- : int = 6
```

Function calling in Reason looks different than it does in languages like Javascript, Java or C. The arguments are passed in plainly one at a time without being comma-separated. As you can see in the above example, parentheses are used differently as well. They can be omitted when the argument is simple, such as in the second example, but in the third example, the second argument to sum2 is more complex, so we wrap it in parentheses. You can read more about this in the [Functions](https://kennetpostigo.gitbooks.io/an-introduction-to-reason/content/Core%20Language/Functions.html) section under "Multiargument Functions & Gotchas".

## If Expressions

```reason
Reason # if (true) {
"Hello";
} else {
"World";
};
- : string = "Hello"

Reason # if (false) {
"Hello";
} else {
"World";
};
- : string = "World"
```

Reason `if/else` expressions should look familiar to you if you've ever dabbled in C, C++, and Javascript. One major difference is that they are expressions in Reason, meaning they always return a value.

Reason does not have a notion of “truthiness” so numbers and strings and lists cannot be used as boolean values. If we try it out, Reason will tell us that we need to work with a real boolean value.

Now let's make a function that tells us if a number is over 9000.

```reason
Reason # let over9000 powerLevel => {
if (powerLevel > 9000) {
"It's Greater Than 9000";
} else {
"meh";
}
};
let over9000 : int => string = <fun>

Reason # over9000 42;
- : string = "meh"

Reason # over9000 100000;
- : string = "It's Greater Than 9000"
```

Here you can notice that we add `{ ... }` to define multi-line functions. `over9000` combines the usage of `functions` and `if/else` control flow.

## Lists

Lists are one of the most common data structures in Reason. They hold a sequence of related things, similar to arrays in C++, Javascript, and Java. You can think of them as a singly-linked list.

Lists can hold many values. Those values must all have the same type. Here are a few examples that use functions from

[the`List`library](https://caml.inria.fr/pub/docs/manual-ocaml/libref/List.html):

```reason
Reason # let names = [ "Alice", "Bob", "Chuck" ];
let names : list string = ["Alice", "Bob", "Chuck"]

Reason # List.length(names) > 0;
- : bool = true

Reason # List.length names;
- : int = 3

Reason # List.rev names;
- : list string = ["Chuck", "Bob", "Alice"]

Reason # let numbers = [1,4,3,2];
let numbers : list int = [1, 4, 3, 2]

Reason # List.sort compare numbers;
- : list int = [1, 2, 3, 4]

Reason # let double = fun n => n * 2;
let double : int => int = <fun>

Reason # List.map double numbers;
- : list int = [2, 8, 6, 4]
```

## Tuples

Tuples are another useful data structure. A tuple can hold a fixed number of values, and each value can have any type. A common use is if you need to return more than one value from a function. The following function gets a name and gives a message for the user:

```reason
Reason # let goodName name => {
if ((String.length name) <= 20) {
(true, "name accepted!");
} else {
(false, "name was too long; please limit it to 20 characters");
}
};
let goodName : string => (bool, string) = <fun>

Reason # goodName("Tom");
- : (bool, string) = (true, "name accepted!")
```

This can be quite handy, but when things start becoming more complicated, it is often best to use records instead of tuples.

## Records

A record is a set of key-value pairs, similar to objects in JavaScript or Python. You will find that they are extremely common and useful in Reason! Let's see some basic examples.

```reason
Reason # type point = { x: int, y: int };
type point = { x : int, y : int, }

Reason # let cursor = { x: 3, y: 4 };
let cursor : point = {x : 3, y : 4}

Reason # cursor.x;
- : int = 3

Reason # type person = { name: string, age: int };
type person = { name : string, age : int, }

Reason # let bill = { name: "Gates", age: 57 };
let bill : person = {name : "Gates", age : 57}

Reason # bill.name;
- : string = "Gates"
```

To create a record you must first define a `type definition` with the shape that the record will abide by. Type definitions are distinguishable with the fact that they start with the keyword `type` instead of `let` and instead of assigning values for the fields on you assign types, ie: `x: int` . Once the type is defined you can create a record that has the same shape as the type.

If you want to access the values on a record simply use `someRecord.field` .

It is often useful to update the values in a record. You can do this on fields you mark fields on the type definition with mutable:

```reason
Reason # type point = { mutable x: int, y: int };
type point = { mutable x : int, y : int, }

Reason # let cursor = { x: 2, y: 5 };
let cursor : point = {x : 2, y : 5}

Reason # cursor.x = 12;
- : unit = ()

Reason # cursor.x;
- : int = 12

Reason # cursor.y = 5;
Error: The record field y is not mutable
```

Only fields marked with mutable can be changed, if you attempt to update a non mutable field you will receive an error from Reason telling you exactly this.

## Comparing Records and Javascript Objects

Records in Reason are _similar_ to objects in Javascript, but there are some crucial differences. The major differences are that with records:

* You cannot ask for a field that does not exist.
* No field will ever be undefined or null.
* Records are Immutable

## Diving Deeper

If you want to learn about each of the core language sections deeper:
* [Functions](/reader/guides/native/anIntroductionToReason/coreLanguage/functions)
* [Records](/reader/guides/native/anIntroductionToReason/coreLanguage/records)
* [Objects](/reader/guides/native/anIntroductionToReason/coreLanguage/objects)
* [Lists](/reader/guides/native/anIntroductionToReason/coreLanguage/lists)
* [Tuples](/reader/guides/native/anIntroductionToReason/coreLanguage/tuples)
* [Modules](/reader/guides/native/anIntroductionToReason/coreLanguage/modules)
* [Functors](/reader/guides/native/anIntroductionToReason/coreLanguage/functors)

