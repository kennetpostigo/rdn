# Array.append

The `append` operator puts two arrays together.

### Parameters

#### array 
The original array.

### array
The array being appended

### Return Value
A new array whose nested arrays have been flattened.

### append two arrays
```
let num1 = [| 1, 2, 3 |];

let num2 = [| 4, 5, 6 |];

let head = Array.append num1 num2;

/* returns [| 1, 2, 3, 4, 5, 6 |] */
```

### Array.append type definition
```
let append: array 'a => array 'a => array 'a;
```

### Syntax
```
Array.append [| array |] [| array |]
```
