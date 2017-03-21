# String.trim

The `trim` operator is used to apply a function to all character indices of a string and stores the result in a new string that is returned.

### Parameters

#### function
Function to apply on each character

#### string
strings who's characters and indices will be passed to function.

### Return Value
string.

### Trim a string
```
let name = "     John Doe             ";

let trimmedName = String.trim name;

/* returns "John Doe" */
```

### String.mapi type definition
```
let trim : string => string
```

### Syntax
```
String.trim string
```
