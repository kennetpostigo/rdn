# List.rev_append

The `rev_append` reverses a list and puts them together. This operator is tail-recursive (more efficient).

### Parameters

#### list 
The original list that is reversed.

### list
The list being appended

### rev_append two list
```
let num1 = [1, 2, 3];

let num2 = [4, 5, 6];

let head = List.rev_append num1 num2;

/* returns [3, 2, 1, 4, 5, 6] */
```

### List.rev_append type definition
```
let rev_append: list 'a => list 'a => list 'a;
```

### Syntax
```
List.rev_append [list] [list]
```
