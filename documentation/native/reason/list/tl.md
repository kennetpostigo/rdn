# List tl

The `tl` operator retrieves every element except the first one.

### Parameters

#### list
The list whose tail you want to retrieve.

### Return Value
All the elements except the first of the list that was passed as a parameter.

### Grab the "tail" element of a list
```
let brands = ["adidas", "puma", "jordans"];

let head = List.tl brands

/* returns ["puma", "jordans"] */
```

### List.tl type definition
```
let tl: list 'a => list 'a;
```

### Syntax
```
List.tl [list]
```
