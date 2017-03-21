# String.make

The `make` operator is used to create a string of a specified length.

### Parameters

#### Length
The length the newly created string should have.

#### Char
The character used to fill the string.

### Return Value
A string.

### Use make to create a string
```
let fiveCharString = String.make 5 'i';

/* returns "iiiii" */
```

### String.make type definition
```
let make : int => char => string
```

### Syntax
```
String.make length char
```
