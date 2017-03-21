# Array.copy

The `copy` creates a copy of an array

### Parameters

#### array 
The array that will be used to create a new array from it's contents.

### Return Value
A array with contents copied from the provided array.

### copy an arrays
```
let numbs = [| 1, 2, 3, 4, 5, 6 7, 8, 9, 10 |];

let numbsCopy = Array.copy numbs;

/* returns [| 1, 2, 3, 4, 5, 6 7, 8, 9, 10 |] */
```

### Array.copy type definition
```
let copy: array 'a => array 'a;
```

### Syntax
```
Array.copy [| array |];
```
