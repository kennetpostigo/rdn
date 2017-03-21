# Array.sub

The `sub` returns a new array from a portion of the array that was provided.

### Parameters

#### array 
The array that will be used to create a new array from it's contents.

#### start
The initial index from the array.

#### length
The length from the starting index of values to take.

### Return Value
A new array.

### sub an arrays
```
let numbs = [| 1, 2, 3, 4, 5, 6 7, 8, 9, 10 |];

let sixToTen = Array.sub numbs 5 5;

/* returns [| 6, 7, 8, 9, 10 |] */
```

### Array.sub type definition
```
let sub: array 'a => int => int => array 'a;
```

### Syntax
```
Array.sub [| array |] start length;
```
