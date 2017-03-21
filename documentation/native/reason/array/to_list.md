# Array.to_list

The `to_list` operator takes an array and returns a list.

### Parameters

#### array 
The array that will be used to turn into a list.

### Return Value
A list with the contents of the array.

### convert array to list
```
let numbs = [| 1, 2, 3, 4, 5 |];

Array.to_list numbs;

/* returns [ 1, 2, 3, 4, 5 ] */
```

### Array.to_list type definition
```
let to_list: array 'a => list 'a;
```

### Syntax
```
Array.to_list [| array |];
```
