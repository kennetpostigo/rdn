# String.map

The `map` operator is used to apply a function to all characters of a string and stores the result in a new string that is returned.

### Parameters

#### function
Function to apply on each character

#### string
strings who's characters will be passed to function.

### Return Value
string.

### map through strings characters
```
let name = "John Doe";
let capName = String.map (fun c => Char.uppercase c) name;

/* returns "JOHN DOE" */
```

### String.map type definition
```
let map : (char => char) => string => string
```

### Syntax
```
String.map function string
```
