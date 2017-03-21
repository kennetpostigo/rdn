# List.nth

The `nth` operator retrieves the element at the specified index.

### Parameters

#### list
The list containing the element you want to retrieve.

#### index
The index of the element in the list.

### Return Value
The value found at the index of the list.

### Grab the nth element of a list
```
let brands = ["adidas", "puma", "jordans"];

let middle = List.nth brands 1;

/* returns "puma" */
```

### List.nth type definition
```
let nth: list 'a => int => 'a;
```

### Syntax
```
List.nth [ list ] index
```
