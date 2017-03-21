# Array.init

The `init` operator creates an array of a specified length of values.

### Parameters

#### length
The length you want the array to be.

#### initiator
A function that returns the element at each index.

### Return Value
The array with the specified length populated with values.

### initialize an array
```
let generateOneToTen = Array.init 10 (fun i => i + 1);

/* returns [| 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 |] */
```

### Array.init type definition
```
let init: int => (int => 'a) => array 'a;
```

### Syntax
```
Array.init int fun
```
