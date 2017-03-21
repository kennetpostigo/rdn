# List.concat

The `concat` concatenates a lists nested lists.

### Parameters

#### list 
The list whos nested list will be concatenated.

### Return Value
A new list whose nested lists have been flattened.

### concat two list
```
let numbs = [[1, 2, 3], [4, 5, 6]];

let head = List.concat numbs;

/* returns [1, 2, 3, 4, 5, 6] */
```

### List.concat type definition
```
let concat: list (list 'a) => list 'a;
```

### Syntax
```
List.concat [[list1], [list2], ..., [listN]];
```
