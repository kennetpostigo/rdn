# Array.get

The `get` operator retrieves the element at the specified index.

### Parameters

#### array
The array containing the element you want to retrieve.

#### index
The index of the element in the array.

### Return Value
The value found at the index of the array.

### Grab the nth element of a array
```
let brands = [| "adidas", "puma", "jordans" |];

let middle = Array.get brands 1;

/* returns "puma" */
```

### Grab the nth element of a array with short syntax
```
let brands = [| "adidas", "puma", "jordans" |];

let middle = brands.(1);

/* returns "puma" */
```

### Array.get type definition
```
let get: array 'a => int => 'a;
```

### Syntax
```
Array.get [| array |] index

array.(index);
```
