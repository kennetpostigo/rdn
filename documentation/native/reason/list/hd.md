# List.hd

The `hd` operator retrieves the first element of a list.

### Parameters

#### list
The list whose head you want to retrieve.

### Return Value
The first element of the list that was passed as a parameter.

### Grab the "head" of a list
```
let brands = ["adidas", "puma", "jordans"];

let head = List.hd brands

/* returns "adidas" */
```

### List.hd type definition
```
let hd: list 'a => 'a;
```

### Syntax
```
List.hd [list]
```
