# String.escaped

The `escaped` operator is used to represent special characters with escape sequences.

### Parameters

#### string
strings that will be escaped.

### Return Value
string.

### Escape a string
```
let specialString = "	¿";

let escapedString = String.escaped specialString;

/* returns "\t\194\191" */
```

### String.escaped type definition
```
let escaped : string => string
```

### Syntax
```
String.escaped string
```
