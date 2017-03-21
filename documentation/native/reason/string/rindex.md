# String.rindex

The `rindex` operator is used to get the index of the last occurence of a specified character.

### Parameters

#### string
strings that will be escaped.

#### char
The character whose index you want to retrieve

### Return Value
integer.

### Find the index of a character in a string
```
let username = "johndoedude";

let findLastD = String.rindex username 'd';

/* returns 9*/
```

### String.rindex type definition
```
let rindex : string => char => int
```

### Syntax
```
String.rindex string char
```
