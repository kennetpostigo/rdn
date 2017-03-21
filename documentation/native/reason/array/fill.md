# Array.fill

The `fill` mutates an arrays contents from a starting point.

### Parameters

#### array 
The array that will be used to fill specified indices with a value.

#### starting
The index to start with filling its content with the specified value.

#### length
The amount of indeces to fill from the starting point.

#### value
The value to fill the indices with

### Return Value
unit()

### fill an arrays contents
```
let numbs = [| 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 |];

let numbsCopy = Array.fill numbs 0 5 0;

/* returns [| 0, 0, 0, 0, 0, 6, 7, 8, 9, 10 |] */
```

### Array.fill type definition
```
let fill: array 'a => int => int => 'a => unit;
```

### Syntax
```
Array.fill [| array |] starting length value;
```
