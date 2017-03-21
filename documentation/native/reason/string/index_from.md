# String.index_from

The `index_from` operator is used to get the index of the first occurence of a specified character after an index.

### Parameters

#### string
string used to find the index of the character.

#### index
The index to start looking for the character at.

#### char
The character whose index you want to retrieve

### Return Value
integer.

### Find the index of a character in a string
```
let username = "johndoedude";

let findDFromIndex = String.index_from username 5 'd';

/* returns 7*/
```

### String.index_from type definition
```
let index_from : string => int => char => int
```

### Syntax
```
String.index_from string index char
```
