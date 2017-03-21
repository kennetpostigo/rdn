# String.rindex_from

The `rindex_from` operator is used to get the index of the last occurence of a specified character after an index.

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

let findDFromIndex = String.rindex_from username 8 'd';

/* returns 7*/
```

### String.rindex_from type definition
```
let rindex_from : string => int => char => int
```

### Syntax
```
String.rindex_from string index char
```
