# String.contains_from

The `contains_from` operator is used to check if a character is in a string after a specified index.

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

let containsN = String.contains_from username 4 'n';

/* returns false*/
```

### String.contains_from type definition
```
let contains_from : string => int => char => bool
```

### Syntax
```
String.contains_from string index char
```
