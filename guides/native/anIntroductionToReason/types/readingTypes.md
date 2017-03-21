# Reading Types

In the [Core Language section](/core_language.md) of this book, we ran a bunch of code in the REPL. Well, we are going to do it again, but now with an emphasis on the types that are getting spit out. So type fire up your REPL again in your terminal with `npm run top` . You should see this:

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

## Primitives and Lists {#primitives-and-lists}

Let's enter some simple expressions and see what happens:

```reason
Reason # "hello";
- : string = "hello"

Reason # not true;
- : bool = false

Reason # floor 3.1415;
- : float = 3.
```

In these three examples, the REPL tells us what\_type\_of value it along with the resulting value. The value `"hello"` is a `string`. The value `3.` is an `float` . Nothing too crazy here.

Let's see what happens with lists holding different types of values:

```reason
Reason # [ "Alice", "Bob" ];
- : list string = ["Alice", "Bob"]

Reason # [ 1.0, 8.6, 42.1 ];
- : list float = [1., 8.6, 42.1]

Reason # [];
- : list 'a = []
```

In the first case, we have a `list` filled with `string` values. In the second, the `list` is filled with `float` values. In the third case the list is empty, so we do not actually know what kind of values are in the list. So the type ``list `a`` is saying "I know I have a list, but it could be filled with anything". The lower-case ```a`` is called a_type variable_, meaning that there are no constraints in our program that pin this down to some specific type. In other words, the type can vary based on how it is used.

## Functions {#functions}

Let's see the type of some functions:

```reason
Reason # String.length;
- : string => int = <fun>
```

The function`String.length`has type `string => int`. This means _it must take_ in a `string` argument, and it will definitely return an integer result. So let's try giving it an argument:

```reason
Reason # String.length "Supercalifragilisticexpialidocious";
- : int = 34
```

The important thing to understand here is how the type of the result `int` is built up from the initial expression. We have a `string => int` function and give it a `string` argument. This results in an `int` .

What happens when you do not give a `string` though?

```reason
Reason # String.length [1,2,3];
Error: This expression has type list 'a
but an expression was expected of type string

Reason # String.length true;
Error: This expression has type bool but an expression was expected of type
string
```

A `string => int` _function must get_ a `string` argument!

### Anonymous Functions {#anonymous-functions}

Reason has a feature called _anonymous functions_. Basically, you can create a function without naming it, like this:

```reason
Reason # fun n => n / 2;
- : int => int = <fun>
```

Defining anonymous functions or lambdas is like defining any function, beginning with the `fun` keyword followed by the list of arguments of the function, and on the right of the arrow, you say what to do with those arguments. In this example, it is saying: I take in some argument I will call `n` and then I am going to divide it by two.

We can use anonymous functions directly. Here is us using our anonymous function with`128`as the argument:

```reason
Reason # (fun n => n / 2)(128);
- : int = 64
```

We start with a `int => int` function and give it a `int` argument. The result is another `int` .

### Named Functions {#named-functions}

In the same way that we can name a value, we can name an anonymous function. So rebellious!

```reason
Reason # let oneHundredAndTwentyEight = 128.0;
let oneHundredAndTwentyEight : float = 128.

Reason # let half = fun n => n /. 2.0;
let half : float => float = <fun>

Reason # half oneHundredAndTwentyEight;
- : float = 64.

Reason # half(oneHundredAndTwentyEight);
- : float = 64.
```

In the end, it works just like when nothing was named. You have a `float => float` function, you give it a `float` , and you end up with another `float`. The last two examples are the same, you can choose to optionally include parens on the parameters passed in.

This is true for all functions, no matter how many arguments they have. So now let's take that a step farther and think about what it means for functions _with multiple arguments_:

```reason
Reason # let divide = fun x y => x / y;
let divide : int => int => int = <fun>

Reason # divide 4 2;
- : int = 2
```

That seems fine, but why are _there two arrows_ in the type for `divide` ?! To start out, it is fine to think that "all the arguments are separated by arrows, and whatever is last is the result of the function". So `divide` takes two arguments and returns a `int` .

To really understand why there are two arrows in the type of `divide` , it helps to convert the definition to use anonymous functions.

```reason
Reason # let divide = fun x y => x / y;
let divide : int => int => int = <fun>

Reason # let divide = fun x => fun y => x / y;
let divide : int => int => int = <fun>
```

All of these are totally equivalent. We just moved the arguments over, turning them into anonymous functions one at a time. So when we run an expression like `divide 4 2` we are actually doing a bunch of evaluation steps:

```reason
divide 4 2
(divide 4) 2 -- Step 1 - Add the implicit parentheses
((fun x => (fun y => x / y)) 4) 2 -- Step 2 - Expand `divide`
(fun y => 4 / y) 2 -- Step 3 - Replace x with 3
4 / 2 -- Step 4 - Replace y with 2
2 -- Step 5 - Do the math
```

After you expand `divide` , you actually provide the arguments one at a time. Replacing `x` and `y` are actually two different steps.

Let's break that down a bit more to see how the types work. In evaluation step \#3 we saw the following function:

```reason
Reason # (fun y => 4 / y);
- : int => int = <fun>
```

It is a `int => int` function, just like `half` . Now in step \#2 we saw a fancier function:

```reason
Reason # (fun x => (fun y => x / y));
- : int => int => int = <fun>
```

Well, we are starting with `fun x => ...` so we know the type is going to be something like `int => ....` We also know that `(fun y => x / y)` has type `int => int` .

So if you actually wrote down all the parentheses in the type, it would instead say `int => (int => int)` . You provide arguments one at a time. So when you replace `x` , the result is actually _another function_. The same goes for all functions in Reason.

Because all functions in Reason work this way, you do not need to give all the arguments at once. It is possible to say things like this:

```reason
Reason # divide 128;
- : int => int = <fun>
```

This is called _partial application_. It lets us use [the`|>`operator](https://caml.inria.fr/pub/docs/manual-ocaml/libref/Pervasives.html) to chain functions together in a nice way, and it is why function types have so many arrows!

## Type Annotations

In Reason you are able to use types as much or as little as you want. Types come in handy when trying to figure out input and output of functions, tuples, records, etc. Lets take a look:

```reason
let frameworkName : string = "React";

let manyFrameworks: (string, string, string) = ("React", "Vue", "Angular");

let stuff = fun (lol: int) => lol;
```

## Type Aliases {#type-annotations}

So far we have just let Reason figure out the types, but it also lets you write a _type annotation_ on the line above a definition if you want. So when you are writing code, you can say things like this:

```reason
type half = int => int;
let half = fun n => n / 2;

type divide = int => int => int;
let divide = fun x y => x / y;

type askVegeta = int => string;
let askVegeta = fun powerLevel => {
if (powerLevel >9000) {
"It's over 9000!!!";
} else {
"It is " ^ string_of_int powerLevel ^ ".";
}
};
```

People can make mistakes in type annotations, so what happens if they say the wrong thing? Well, the compiler does not make mistakes, so it still figures out the type on its own. It then checks that your annotation matches the real answer. In other words, the compiler will always verify that all the annotations you add are correct.
