# List.rev

The `rev` operator reverses the elements of a list.

### Parameters

#### list
The list containing the element you want to retrieve.

### Return Value
The list in the reverse order.

### Reverse a list
```
let brands = ["adidas", "puma", "jordans"];

let head = List.rev brands;

/* returns ["jordans", "puma", "adidas"] */
```

### List.rev type definition
```
let rev: list 'a => list 'a;
```

### Syntax
```
List.rev [list]
```
