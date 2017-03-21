# Functions

> If you haven't read the [Core Language Overview](/reader/guides/native/anIntroductionToReason/coreLanguage/coreLanguage) please do before diving deeper.

Functions are the smallest unit you have to build with. Many large systems are built on several small units, that are often functions. Functions are your friend!

## Anonymous Functions

In reason you are able to create anonymous functions or lambdas and use them throughout your code.

```reason
Reason # fun (x) => x + 10;
- : int => int = <fun>

Reason # fun x => x + 10;
- : int => int = <fun>
```

As you can see when writing functions you can choose to omit the parenthesis around the parameters you pass into the function. Both of the functions above are equivalent, even their typing is the same `- : int => int = <fun>` . However how do we invoke these functions if they have no name?!?! Well, lets do just that:

```reason
Reason # (fun (x) => x + 10)(2);
- : int = 12

Reason # (fun x => x + 10) 2;
- : int = 12
```

First thing you do is wrap the function expression in a set of parenthesis and then pass in the parameters the lambda takes. Just like with the parameters you can invoke the function with or without parenthesis.

## Named Functions

Functions in reason are first class citizens! You can treat them as values in your programs and use let bindings to give them names just as you would with integers, floats, strings, etc.

```reason
Reason # let add10 (n) => n + 10;
let add10 : int => int = <fun>

Reason # let add10 n => n + 10;
let add10 : int => int = <fun>
```

The function declarations above are given the name `add10`. Both are the equivalent, one doesn't use parenthesis when defining the parameters it takes.Now to invoke these functions we simply type the name of the function followed by the parameters \(with or without parenthesis\).

```reason
Reason # add10(5);
- : int = 15

Reason # add10 5;
- : int = 15
```

## Multiargument Functions & Gotchas

Lets define some functions that take more than one argument:

```reason
Reason # let add x y => x + y;
let add : int => int => int = <fun>

Reason # let add (x, y) => x + y;
let add : (int, int) => int = <fun>
```

Notice something odd here? The type definitions aren't the same. Meaning these function aren't really the same. Lets test them out one by one and see what problems we come across:

```reason
Reason # let add (x, y) => x + y;
let add : (int, int) => int = <fun>

Reason # add(5,5);
- : int = 10

Reason # add 5 5;
Error: This function has type (int, int) => int
It is applied to too many arguments; maybe you forgot a `;'.
```

First we define the function `add` in the REPL, notice we used the version with the parentheses around the parameters. Then we invoke the function with parentheses. The call to `add` returns 10, as we would expect. However when we invoke it again this time without parentheses we get an error complaining about the types passed in. The reason that this happens is that when you define a function with 2 or more parameters and you wrap them in parenthesis it interprets it as a function that takes a [`tuple`](/Core Language/Tuples.md) containing 2 or more values. When you call it without parenthesis you are passing 2 values of type `int`, but the function is expecting 1 `tuple` value.

```reason
Reason # let add x y => x + y;
let add : int => int => int = <fun>

Reason # add 5 5;
- : int = 10

Reason # add (5, 5);
Error: This expression has type ('a, 'b)
but an expression was expected of type int
```

The same thing can happens in reverse, this time we don't use parenthesis for the `add` parameters, and when we invoke the function without parenthesis it works out well! However when we use parenthesis to invoke the function we get an error complaining that we we didn't pass in an `int` , rather a `tuple` . So be aware of how you define your functions so that you invoke them correctly. Most times the compiler will catch it for you ahead of time and warn you.

## Labelled Arguments

In many programming languages like Javascript, Java, C++, etc. argument to a function are passed in positionally. Let's illustrate what this means by creating a function that _must_ takes in a boolean then a string:

```reason
Reason # let boolString (b:bool) (s:string) => (b, s);
let boolString : bool => string => (bool, string) = <fun>

Reason # boolString true "word up";
- : (bool, string) = (true, "word up")

Reason # boolString "word up" true;
Error: This expression has type bytes but an expression was expected of type
bool
```

As you can see when we invoke `boolString` the first time with the arguments in the correct order everything goes according to plan. For arguments sake \(pun intended\) lets say we forgot the order the arguments and we flip the arguments we get an error saying that there was a type mismatch. This is a simple example but say a function takes several arguments that are hard to remember and say some are optional. It's makes it difficult to maintain the order in your head and know if you need certain parameters, this can happen often in practice. Well good old Reason got your back with labelled arguments!

```reason
Reason # let getHero sk::sk name::name => {
  if (sk) {
    let sideKicks = ["robin", "speedy"];
    List.find (fun side => name == side) sideKicks;
  } else {
    let heroes = ["batman", "arrow"];
    List.find (fun hero => name == hero) heroes;
  }
};
let getHero : sk::bool => name::string => string = <fun>

Reason # getHero name::"batman" sk::false;
- : string = "batman"

Reason # getHero sk::true name::"robin";
- : string = "robin"
```

Above we defined a function called `getHero` that takes 2 labelled arguments, `sk` and `name` . To label an argument you simply pass the label you want the argument to have followed by double colon `::` and then finally the name of the argument you will use in the function. In `getHero` we used the named the label of the argument and the name of the argument the same. Now we can call the arguments in whatever order we want with the label and Reason will know how to apply the parameters and no will no longer throw and error.

## Argument Punning

As we in the Labelled Arguments section the `getHero` function was able to take arguments in any order so long as the label was included when passing in arguments to the function. However when defining functions with labelled arguments there is a neat trick for saving a few keystrokes! In Reason this is called argument punning, you are only able to do this if the label and the name of the argument are the same:

```reason
Reason # let getHero sk::sk name::name => {
  if (sk) {
    let sideKicks = ["robin", "speedy"];
    List.find (fun side => name == side) sideKicks;
  } else {
    let heroes = ["batman", "arrow"];
    List.find (fun hero => name == hero) heroes;
  }
};
let getHero : sk::bool => name::string => string = <fun>

Reason # getHero name::"batman" sk::false;
- : string = "batman"

Reason # getHero sk::true name::"robin";
- : string = "robin"
```

## Recursive Functions

In functional programming languages recursion is important and useful to make code simpler and more concise. Reason is unlike most languages because you have to explicitly tell it that a function is recursive by using the `rec` keyword prior to the definition of the function. The `rec` keyword is the only way a function is able to refer to itself in Reason. If you've ever worked on medium to large codebase it can be difficult to remember which functions are recursive or read code you are not familiar with it may take you a while to realize a function is recursive. In reason you won't have that problem because upon scanning the code you will see the `rec` keyword prior to the function declaration. Lets take a look at recursive function in action:

```reason
Reason # let rec sum list =>
  switch list {
    | [] => 0
    | [hd, ...tl] => hd + sum tl
  };
let sum : list int => int = <fun>

Reason # sum [1,2,3];
- : int = 6
```

The function sum takes a list of type int as an argument, the goal of the function is to iterate through the function and continuously add the values in the list until no items are left traverse. The base case is the first branch in the `switch` that will look at the list passed in and if it is empty it will return 0. The second branch will grab the head of the list in the `hd` variable and then grab the rest of the list in the `tl` variable \(`[hd, ...tl]`\) and then add the `hd` to the recursive `sum` of the `tl` \(`hd + sum tl`\).
