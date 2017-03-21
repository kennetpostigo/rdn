# Lists

> If you haven't read the [Core Language Overview](/reader/guides/native/anIntroductionToReason/coreLanguage/coreLanguage) please do before diving deeper.

Lists in reason are immutable singly lists. If you come from a Javascript background they should look familiar to you and feel natural to use. Lists have a great range of helpful built in methods that are useful for traversing, scanning, and manipulating lists. Lets dive in:

```reason
Reason # let numbers = [1, 2, 3];
let numbers : list int = [1, 2, 3]
```

Some things to keep in mind are that lists can only hold values of the same type. You cannot mix different types together in a list. Lets take a look at this:

```reason
Reason # let mixed = [1, "one", 2, "two", 3, "three"];
Error: This expression has type string but an expression was expected of type
int
```

Reason will make you aware of the error immediately because it infers the type the list should be.

Combining and appending elements to a list in Reason is different to how it is done in most languages because there is no dedicated method on List for this operation.

```reason
Reason # let number = 5;
let number : int = 5

Reason # let numbers = [4, 3, 2, 1];
let numbers : list int = [4, 3, 2, 1]

Reason # let numbers = [number, ...numbers];
let numbers : list int = [5, 4, 3, 2, 1]
```

The `...numbers` is similar to JavaScripts spread but not quite the same. If it we're the following would be valid:

```reason
Reason # let number = 5;
let number : int = 5

Reason # let numbers = [1, 2, 3, 4];
let numbers : list int = [1, 2, 3, 4]

Reason # let numbers = [...numbers, number];
Error: Syntax error
```

This is because `...` is the `cons` operator from OCaml under the hood and the `cons` operator expects an element to the left because it should always come after some initial element. Also you should keep in mind that appending to the end of a list is an anti pattern because it requires a full copy of the list. Adding an element to the front of the list requires allocating a single cell, whereas the tail of the new list can just point to the old list. OCaml community is ruthlessly hell bent on performance and for good reason \(is that a pun?\). If you want to accomplish this sort of task you can do the following:

```reason
Reason # let number = 5;
let number : int = 5

Reason # let numbers = [1, 2, 3, 4];
let numbers : list int = [1, 2, 3, 4]

Reason # numbers @ [number];
- : list int = [1, 2, 3, 4, 5]
```

#### Useful List Operations

You can get the length of a list by using the `length` operator:

```reason
Reason # let numbers = [1, 2, 3, 4, 5];
let numbers : list int = [1, 2, 3, 4, 5]

Reason # List.length numbers;
- : int = 5
```

To grab a specific element in a list you can use the `nth` operator:

```reason
Reason # let numbers = [1, 2, 3, 4, 5];
let numbers : list int = [1, 2, 3, 4, 5]

Reason # List.nth numbers 2;
- : int = 3
```

Keep in mind that you pass in the index you want and lists start at 0.

You can iterate and apply transformations of elements from a list with map:

```reason
Reason # let numbers = [1, 2, 3, 4, 5];
let numbers : list int = [1, 2, 3, 4, 5]

Reason # List.map (fun n => n + 1) numbers;
- : list int = [2, 3, 4, 5, 6]
```

If you want to process a list in order to build a return value than `fold_left` and `fold_right` are the tools for the job. If you come from a JavaScript background then `fold_left` is `reduce` and `fold_right` is `reduceRight` . Lets take a look at both:

```reason
Reason # List.fold_left (fun a b => a + b) 0 numbers;
- : int = 15

Reason # List.fold_right (fun a b => a + b) numbers 0;
- : int = 15
```

They both provide the same result in this scenario but not always. There is a subtle difference between the order in which the lists is being processed:

```reason
// fold_left
(((((0 + 1) + 2) + 3) + 4) + 5)

fold_right
(1 + (2 + (3 + (4 + (5 + 0)))))
```

There are a lot more operators we won't cover here, but you can find them in the [List module](http://caml.inria.fr/pub/docs/manual-ocaml/libref/List.html) of the OCaml documentation.

## Similar Data Structures

Reason has similar list like data structures that you can use. Array is one alternative to List but using Array over List and vice versa has their own tradeoffs. Heres a simple example of what Arrays look like in Reason:

```reason
Reason # [| 1, 2, 3 |];
- : array int = [|1, 2, 3|]
```


