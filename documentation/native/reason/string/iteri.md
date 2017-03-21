# String.iteri

The `iteri` operator is used to apply a function to all index of each character of a string.

### Parameters

#### function
Function to apply on each character index.

#### string
strings who's character indices will be passed to function.

### Return Value
unit.

### concatenate strings
```

```

### String.iter type definition
```
let iteri : (int => char => unit) => string => unit
```

### Syntax
```
String.iteri function string
```
