# String.index

The `index` operator is used to get the index of the first occurence of a specified character.

### Parameters

#### string
string used to find the index of a character.

#### char
The character whose index you want to retrieve

### Return Value
integer.

### Find the index of a character in a string
```
let username = "johndoedude";

let findFirstD = String.index username 'd';

/* returns 4*/
```

### String.index type definition
```
let index : string => char => int
```

### Syntax
```
String.index string char
```
