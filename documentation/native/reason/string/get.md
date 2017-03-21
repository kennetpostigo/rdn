# String.get

The `get` operator is used to retrieve the character of a String found at the specified index.

### Parameters

#### String
The string you want to retrieve the character from.

#### Index
The index of the char.

### Return Value
A Char found at the index.

### Get a charachter from a string
```
let name = "John Doe";

String.get name 5;

/* returns 'D' */
```

### Use shorthand get syntax
```
let name = "John Doe";

name.[5];

/* returns 'D' */
```

### String.get type definition
```
let get : string => int => char
```

### Syntax
```
String.get string index
```
