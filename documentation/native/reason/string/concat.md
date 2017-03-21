# String.concat

The `concat` operator is used to concatenate strings together.

### Parameters

#### seperator
seperator between strings being concatenated.

#### list
list of strings to concatenate together

### Return Value
A string.

### concatenate strings
```
let lastName = "Doe";

let firstName = "John";

let lastThenFirst = String.concat ", " [lastName, firstName];

/* returns "Doe, John" */
```

### String.concat type definition
```
let concat : string => string list => string
```

### Syntax
```
String.concat seperator list
```
