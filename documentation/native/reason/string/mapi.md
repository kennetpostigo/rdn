# String.mapi

The `mapi` operator is used to apply a function to all character indices of a string and stores the result in a new string that is returned.

### Parameters

#### function
Function to apply on each character

#### string
strings who's characters and indices will be passed to function.

### Return Value
string

### map through strings characters
```
let yo = "yoyoyoyoyo";

let stringMod i c =>
  if (i mod 2 == 0) {
    Char.uppercase c
  } else {
    c
  };

let superYo = String.mapi stringMod yo;

/* returns "YoYoYoYoYo" */
```

### String.mapi type definition
```
let mapi : (int => char => char) => string => string
```

### Syntax
```
String.mapi function string
```
