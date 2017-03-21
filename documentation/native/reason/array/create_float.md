# Array.create_float

The `create_float` operator creates an array of a specified length with float values.

### Parameters

#### length
The length you want the array to be.

### Return Value
The array with the specified length populated with float values.

### Generate an float array
```
let threeFloats = Array.create_float 3;

/* returns [| 2.40313530137e-320, 2.18084879584e-314, 2.18127058956e-314 |] */
```

### Array.create_float type definition
```
let create_float: int => array float;
```

### Syntax
```
Array.create_float int
```
