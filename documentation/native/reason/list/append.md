# List.append

The `append` operator puts to lists together.

### Parameters

#### list 
The original list.

### list
The list being appended

### Return Value
A new list made up of the two lists.

### append two list
```
let num1 = [1, 2, 3];

let num2 = [4, 5, 6];

let head = List.append num1 num2;

/* returns [1, 2, 3, 4, 5, 6] */
```

### List.append type definition
```
let append: list 'a => list 'a => list 'a;
```

### Syntax
```
List.append [list] [list]
```
