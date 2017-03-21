# String.init

The `init` operator is used to initialize a string with char values.

### Parameters

#### Length
The length the newly created string should have.

#### initializer
Function that takes an integer as a parameter and returns a char.

### Return Value
A string.

### Use init to create a string
```
let fiveCharString = String.init 5 (fun i => 'a');

/* returns "aaaaa" */
```

### String.init type definition
```
let init : int => (int => char) => string
```

### Syntax
```
String.init length initializer
```
