# List.flatten

The `flatten` flattens a lists nested lists. Is an alias for the concat operator.

### Parameters

#### list 
The list whos nested list will be flattened.

### flatten two list
```
let numbs = [[1, 2, 3], [4, 5, 6]];

let head = List.flatten numbs;

/* returns [1, 2, 3, 4, 5, 6] */
```

### List.flatten type definition
```
let flatten: list (list 'a) => list 'a;
```

### Syntax
```
List.flatten [[list1], [list2], ..., [listN]];
```
