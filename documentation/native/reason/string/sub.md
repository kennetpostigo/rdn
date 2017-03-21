# String.sub

The `sub` operator is used to get a substring of an existing string.

### Parameters

#### string
The length the newly created string should have.

#### start
The index to start creating a new string from

#### length
The quantity of chars from the start to take from the original string.

### Return Value
A string.

### create a substring from and existing string
```
let name = "John Doe";

let lastName = String.sub name 5 3;

/* returns "Doe" */
```

### String.sub type definition
```
let sub : string => int => int => string
```

### Syntax
```
String.sub string start length
```
