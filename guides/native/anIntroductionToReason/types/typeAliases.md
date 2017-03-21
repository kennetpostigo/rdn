# Type Aliases

The whole point of type aliases is to make you type annotations easier to read.

As your programs get more complicated, you find yourself working with larger and more complex data. For example maybe you are making twitter-for-dogs and you need to represent a user. Maybe you want a function that checks to see if a user has a bio or not. You might write a function like this:

```reason
type user = {name: string, bio: string, pic: string};

type hasBio = user => bool;

let hasBio = fun {bio} => String.length bio > 0;
```

The type annotation here are clear. There is a `user` type that is a record. Then the type for `hasBio` takes a `user` and returns a `bool`. Finally the implementation of `hasBio` which uses some pattern-matching to take the bio field off the `user` record passed in.

So if we write a function to add a bio, it would be like this:

```reason
type addBio = string => user => user;
let addBio = fun bio user => {
let user = {...user, bio: bio};
};
```

Imagine what the type annotation would look like if we did not have the user type alias. Bad!

Type aliases are not just about cosmetics though. They can help you think more clearly. When writing Reason programs, it is often best to _start_ with the type alias before writing a bunch of functions. I find it helps direct my progress in a way that ends up being more efficient overall. Suddenly you know exactly what kind of data you are working with. If you need to add stuff to it, the compiler will tell you about any existing code that is affected by it. I think most experienced Reason folks use a similar process when working with records especially.
