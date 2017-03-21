# List [x, ...l]

The `...` operator is just the cons operator in new clothing, use it to append an element to a list.

### Parameters

#### element
The value to be added to the list.

#### list
The list you want the element to be appended to.

### Return Value
A new list with the newly appended item.

### Add an element to the List
```
let brands = ["adidas", "puma", "jordans"];

let brandsWithNike = ["nike", ...brands];

/* returns ["nike", "adidas", "puma", "jordans"] */
```

### ... type definition
```
let cons: 'a => list 'a => list 'a;
```

### Syntax
```
[element, ...list]
```
