# Array.make

The `make` operator creates an array of a specified length populated with a specified value.

### Parameters

#### length
The length you want the array to be.

#### value
The value you want the array to have.

### Return Value
The array with the specified length populated with the specified value.

### Generate an array
```
let tenOnes = Array.make 10 1;

/* returns [| 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 |] */
```

### Array.make type definition
```
let make: int => 'a => array 'a;
```

### Syntax
```
Array.make int value
```
