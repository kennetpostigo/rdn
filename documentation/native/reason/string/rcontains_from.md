# String.rcontains_from

The `rcontains_from` operator is used to check for the last occurance of a character in a string after a specified index.

### Parameters

#### string
string used to check for the character.

#### index
The index to start checking for the character.

#### char
The character to look for in the string.

### Return Value
boolean.

### Check if a string has the letter n after and index
```
let username = "johndoedude";

let containsN = String.rcontains_from username 4 'n';

/* returns true*/
```

### String.rcontains_from type definition
```
let rcontains_from : string => int => char => bool
```

### Syntax
```
String.rcontains_from string index char
```
