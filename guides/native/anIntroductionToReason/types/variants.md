# Variants

Many languages have trouble expressing data with weird shapes. They give you a small set of built-in types, and you have to represent everything with them. So you often find yourself using `null` or booleans or strings to encode details in a way that is quite error prone.

_Reasons_ _variants_ let you represent complex data much more naturally. We will go through a couple concrete examples to build some intuition about how and when to user variants.

> **Note: **Variants are sometimes called Union types or [tagged unions](https://en.wikipedia.org/wiki/Tagged_union). Some communities call them [ADTs](https://en.wikipedia.org/wiki/Algebraic_data_type).

## Filtering a Todo List

> **Problem:** We are creating a todo list full of tasks. We want to have three views: show all tasks, show only active tasks, and show only completed tasks. How do we represent which of these three states we are in?

```reason
Reason # type Visibility =
| All
| Active
| Completed;

Reason # All;
- : Visibility = All

Reason # Active;
- : Visibility = Active

Reason # Completed;
- : Visibility = Completed
```

Now that we have these three cases defined, we want to create a function keep that will properly filter our tasks. It should work like this:

```reason
type task = {
task: string,
complete: bool
};

type buy = task;
let buy = {
task: "Buy milk",
complete: true
};

type drink = task;
let drink = {
task: "Drink milk",
complete: false
};

type tasks = list task;
let tasks = [buy, drink];

# type keep = Visibility => List Task => List Task;
# keep All tasks == [buy, drink];
# keep Active tasks == [drink];
# keep Complete tasks == [buy];
```

So they `keep` function needs to look at its first argument, and depending on what it is, filter the list in various ways. We use a `switch` expression to do this. It is like an `if` on steroids:

```reason
type keep = visibility => list task => list tasks;
let keep = fun visibility tasks => {
switch visibility {
| All => tasks;
| Active => List.filter (fun task => not task.complete) tasks;
| Completed => List.filter (fun task => task.complete) tasks;
};
};
```

The `switch` is saying, look at the structure of visibility. If it is `All` , just give back all the tasks. If it is `Active` , keep only the tasks that are not complete. If it is `Complete` , keep only the tasks that are complete.

The cool thing about switch expression is that all the branches are checked by the compiler. This has some nice benefits:

1. If you mistype `Compleet` by accident, you get a hint about the typo.
2. If you forget to handle a case, the compiler will figure it out and tell you.

So say you want to add `Recent` as a fourth possible `Visibility` value. The compiler will find all the `switch` expressions in your code that work with `Visibility` values and remind you to handle the new possibility! This means you can change and extend `Visibility` without the risk of silently creating bugs in existing code.

## Anonymous Users

> **Problem:** We have a chat room where people can post whatever they want. Some users are logged in and some are anonymous. How should we represent a user?

Again, whenever there is weird shaped data, you want to reach for a variant. For this case we want one where users are either anonymous or named:

```reason
Reason # type user =
| Anonymous
| Named string;

Reason # Anonymous;
- : user = Anonymous

Reason # Named "AzureDiamond";
- : user = Named "AzureDiamond"

Reason # Named "abraham-lincoln";
- : user = Named "abraham-lincoln"
```

So creating the type `user` also created constructors named `Anonymous` and `Named`. If you want to create a `user` you _must_ use one of these two constructors. This guarantees that all the possible `user` values are things like:

```reason
Anonymous
Named "AzureDiamond"
Named "abraham-lincoln"
Named "catface420"
Named "Tom"
...
```

Now that we have a representation of a `user`, lets say we want to get a photo of the to show next to their posts. Again, we need to use a `case` expression to work with out `user` type:

```reason
type userPhoto = user -> string;
let userPhoto = switch user {
| Anonymous => "anon.png";
| Named name => "users/" ^ name ^ ".png";
};
```

There are two possible cases when we have a `user`. If they are `Anonymous` we show a dummy picture. If they are `Named` we construct the URL of their photo. This `switch` is slightly fancier than the one we saw before. Notice that the second branch has a lower case variable name. This means that when we see a value like Named `"AzureDiamond"` , the `name` variable will be bound to `"AzureDiamond"` so we can do other things with it. This is called _pattern matching_.

Now imagine we have a bunch of users in a chat room and we want to show their pictures.

```reason
type activeUsers = list user;
let activeUsers = [Anonymous, Named "catface420", Named "AzureDiamond", Anonymous];

type photos = list string;
let photos = list.map userPhoto activeUsers;

# [ "anon.png", "users/catface420.png", "users/AzureDiamond.png", "anon.png" ];
```

The nice thing about creating a type like `user` is that no one in your whole codebase can ever "forget" that some users may be anonymous. Anyone who can get a hold of a `user` needs to use a `switch` to get any information out of it, and the compiler guarantees every `case` and handles all possible scenarios!

## Widget Dashboard

> **Problem: **You are creating a dashboard with three different kinds of widgets. One shows a recent log data, one shows time plots, and one shows scatter plots. How do you represent a widget?

Alright, we are getting a bit fancier now. In Reason, you want to start by solving each case individually. \(As you get more experience, you will see that Reason _wants_ you to build programs out of small, reusable parts. It is weird.\) So I would create representations for each of our three scenarios, along with view functions to actually turn them into HTML or SVG or whatever:

```reason
type logsInfo = {
logs: list string
};

type timeInfo = {
events: list (string, float),
yAxis: string
};

type scatterInfo = {
points: list (float, float),
xAxis: string,
yAxis: string
};
```

At this point you have created all the helper functions needed to work with these three cases totally independent from each other. Someone can come along later and say, "I need a nice way to show scatter plots" and use just that part of code.

So the question is really: how do I put these three standalone things together in my particular scenario?

Again, variants are there to put a bunch of different types!

```reason
Reason # type widget =
| Logs logsInfo
| TimePlot timeInfo
| ScatterPlot scatterInfo;
```

So we created a widget type that can only be created with these constructor functions. You can think of these constructors as tagging the data so we can tell it apart at runtime

```reason
type view = widget;

let view = switch widget {
| Logs logsInfo => logsInfo;
| TimePlot timeInfo => timeInfo;
| ScatterPlot scatterInfo => scatterInfo;
};
```

One nice thing about this approach is that there is no mystery about what kind of widgets are supported. There are exactly three. If someone wants to add a fourth, they modify the `widget` type. This means you can never be surprised by the data you get, even if someone on a different team is messing with your code.

> **Takeaways:**
>
> * Solve each subproblem first.
> * Use variants to put together all the solutions.
> * Creating a variant type generates a bunch of _constructors_.
> * These constructors _tag_ data so that we can differentiate it at runtime.
> * A `switch` expression lets us tear data apart based on these tags.
>
> The same strategies can be used if you are making a game and have a bunch of different bad guys. Goombas should update one way, but Koopa Troopas do something totally different. Solve each problem independently, and then use a union type to put them all together.

## Linked Lists

> **Problem:** You are stuck on a bus speeding down the highway. If the bus slows down, it will blow up. The only way to save yourself and everyone on the bus is to reimplement linked lists in Reason. HURRY, WE ARE RUNNING OUT OF GAS!

Yeah, yeah, the problem is contrived this time, but it is important to see some of the more advanced things you can do with variants!

A [linked list](https://en.wikipedia.org/wiki/Linked_list) is a sequence of values. If you are looking at a linked list, it is either empty or it is a value and more more list. That list is either empty or is a value and more list. etc. This intuitive definition works pretty directly in Reason Let's see it for lists of integers:

```reason
Reason # type intList = Empty | Node int intList;

Reason # Empty;
- : intList = Empty

Reason # Node 42 None;
- : intList = Node 42 Empty

Reason # Node 64 (Node 128 Empty);
- : intList = Node 64 (Node 128 Empty)
```

Now we did two new things here:

1. The `Node` constructor takes two arguments instead of one. This is fine. In fact, you can have them take as many arguments as you want.
2. Our variant type is _recursive_. An `intList` may hold another `intList`. Again, this is fine if you are using variant types.

The nice thing about our intList type is that now we can only build valid linked lists. Every linked list needs to start with `Empty` and the only way to add a new value is with `Node`.

It is equally nice to work with. Let's say we want to compute the sum of all of the numbers in a list. Just like with any other union type, we need to use a switch and handle all possible scenarios:

```reason
type sum = intList => int;
let rec sum = fun numbers =>
switch numbers {
| Empty => 0;
| Node n remainingNumbers => n + sum remainingNumbers;
};
```

If we get an `Empty` value, then the sum is 0. If we have a `Node` we add the first element to the sum of all the remaining ones. So an expression like `(sum (Node 1 (Node 2 (Node 3 Empty))))` is evaluated like this:

```reason
sum (Node 1 (Node 2 (Node 3 Empty)))
1 + sum (Node 2 (Node 3 Empty))
1 + (2 + sum (Node 3 Empty))
1 + (2 + (3 + sum Empty))
1 + (2 + (3 + 0))
1 + (2 + 3)
1 + 5
6
```

On each line, we see one evaluation step. When we call `sum` it transforms the list based on whether it is looking at a `Node` or and `Empty` value.

> **Note: **This is the first recursive function we have written together! Notice that the assignment of has the keyword `rec` to explicitly let you know that the `sum` is recursive, and `sum` calls itself to get the sum. It can be tricky to get into the mindset of writing recursive functions, so I wanted to share one weird trick. **Pretend you are already done.**
>
> I always start with a `switch` and all of the branches listed but not filled in. From there, I solve each branch one at a time, pretending that nothing else exists. So with `sum` I'd look at `Empty =>` and say, and empty list has to sum to zero. Then I'd look at the `Node n remainingNumbers =>` branch and think, well, I know I have a number, a list, and a sum function that definitely already exists and totally works. I can just use that and add a number to it!

## Generic Data Structures

> **Problem:** The last section showed lined lists that only worked for integers. That is pretty lame. How can we make linked lists that hold any kind of value?

Everything is going to be pretty much the same, except we are going to introduce a type variable in our definition of lists:

```reason
Reason # type linkList 'a = Empty | Node 'a (linkList 'a);
type linkList 'a = Empty | Node of 'a linkList 'a

Reason # Empty;
- : linkList 'a = Empty

Reason # Node "hi" Empty;
- : linkList string = Node "hi" Empty

Reason # Node 1.618 (Node 6.283 Empty);
- : linkList float = Node 1.618 (Node 6.283 Empty)
```

The fancy part comes in the `Node` constructor. Instead of pinning the data to `int` and `intList` , we say that it can hold ```a`` and ``linkList `a`` . Basically, you can add a value as long as it is the same type of value as everything else in the list.

Everything else is the same. You pattern match on lists with switch and you write recursive functions. The only difference is that our lists ca hold anything now!

## Languages

We can even model a programming language as data if we want to go really crazy! In this case it is one that only deals with [Boolean algebra](https://en.wikipedia.org/wiki/Boolean_algebra#Operations):

```reason
type boolean =
| T
| F
| Not boolean
| And boolean boolean
| Or boolean boolean;

let customOr = Or T F;

let customAnd = And T T

let customBoolAlgebra = And T (Not T);
```


