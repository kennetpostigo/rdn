# Array.blit

The `blit` copies elements from one array to another array.

### Parameters

#### array 
The array whos elements will be copied into the second array.

#### starting
The indice to start copying elements from.

#### array2
The array that will received the copied elements

#### starting2
The indice to start placing the copied values into.

#### length
The length to placed the copied values into.

### Return Value
unit()

### copy an arrays contents into another array
```
let oneToFive = [| 1, 2, 3, 4, 5 |];

let sixToTen = [| 6, 7, 8, 9, 10 |];

Array.blit oneToFive 0 sixToTen 0 5;

/* sixToTen is now [| 1, 2, 3, 4, 5 |] */
```

### Array.blit type definition
```
let blit: array 'a => int => array 'a => int => int => unit;
```

### Syntax
```
Array.blit [| array |] starting [| array2 |] starting2 length;
```
