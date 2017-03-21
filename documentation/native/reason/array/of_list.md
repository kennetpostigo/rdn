# Array.of_list

The `of_list` operator takes a list and returns a array.

### Parameters

#### list 
The list that will be used to turn into a array.

### Return Value
A array with the contents of the list.

### convert list to array
```
let numbs = [ 1, 2, 3, 4, 5 ];

Array.of_list numbs;

/* returns [| 1, 2, 3, 4, 5 |] */
```

### Array.of_list type definition
```
let of_list: list 'a => array 'a;
```

### Syntax
```
Array.of_list [ list ];
```
