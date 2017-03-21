# String.contains

The `contains` operator is used to check if a character is in a string.

### Parameters

#### string
string used to check for the character.

#### char
The character to look for in the string

### Return Value
boolean.

### Check if a string has the letter n
```
let username = "johndoedude";

let containsN = String.contains username 'n';

/* returns true*/
```

### String.contains type definition
```
let contains : string => char => bool
```

### Syntax
```
String.contains string char
```
