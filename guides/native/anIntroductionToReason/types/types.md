# Types

One of Reason's major benefits is its powerful type system that it inherits from OCaml. OCaml's type system is great and has powered many tools like flow that add static types to Javascript. Now I know what you may be thinking, but types in Reason are not painful like the ones you may have encountered in Java.

In Reason types can be defined in many ways and optionally included in your code _almost_ always, this is possible because Reason is able to infer the types in your code:

```reason
Reason # let kewlMath = fun (x, y) => x + y ;
let kewlMath : (int, int) => int = <fun>

Reason # let addForDays = kewlMath(5,5);
let addForDays : int = 10
```

As you can see Reason automatically infers what types the parameter is and the return type of the function. Reason is smart enough to know this and will catch your errors and notify you about them immediately as well:

```reason
Reason # let addForDays = kewlMath(5, true);
Error: This expression has type bool but an expression was expected of type
int
```

Reason will save you many hours of your precious time debugging. It provides really helpful errors and feedback to get you on the right track and squash bugs.
