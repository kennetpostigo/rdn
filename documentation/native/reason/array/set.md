# Array.set

The `set` modifies the array at the specified index in place.

### Parameters

#### array
The array containing the element you want to retrieve.

#### index
The index of the element in the array.

#### value
The desired value the index should be set to.

### Return Value
The value found at the index of the array.

### Set the nth element of a array
```
let brands = [| "adidas", "puma", "jordans" |];

let middle = Array.set brands 1 "nike";

/* returns unit() */
```

### Set the nth element of a array with short syntax
```
let brands = [| "adidas", "puma", "jordans" |];

brands.(1) = "nike";

/* returns unit() */
```

### Array.get type definition
```
let set: array 'a => int => 'a => unit;
```

### Syntax
```
Array.set [| array |] index value

array.(index) = value;
```
