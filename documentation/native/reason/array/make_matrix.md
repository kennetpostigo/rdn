# Array.make_matrix

The `make_matrix` operator creates a two-dimensional array of a specified length of all indices are initialized to the same value.

### Parameters

#### lengthX
The length of the outer most array.

#### lengthY
The length of the nested arrays.

#### value
The value all indices are initialized to.

### Return Value
A two-dimensional array.

### initialize an array
```
let generateTwoByTwoOnes = Array.make_matrix 2 2 1;

/* returns [| [|1, 1|], [|1, 1|] |] */
```

### Array.make_matrix type definition
```
let make_matrix: int => int => 'a => array (array 'a);
```

### Syntax
```
Array.make_matrix int int value
```
