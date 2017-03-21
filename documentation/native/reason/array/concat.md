# Array.concat

The `concat` concatenates a list of nested arrays.

### Parameters

#### list 
The list whos nested arrays will be concatenated.

### Return Value
A new array whose nested arrays have been flattened.

### concat two arrays
```
let numbs = [ [| 1, 2, 3 |], [| 4, 5, 6 |] ];

let head = Array.concat numbs;

/* returns [| 1, 2, 3, 4, 5, 6 |] */
```

### Array.concat type definition
```
let concat: list (array 'a) => array 'a;
```

### Syntax
```
Array.concat [ [| array1 |], [| array2 |], ..., [| arrayN |] ];
```
