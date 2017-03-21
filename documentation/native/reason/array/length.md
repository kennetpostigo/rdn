# Array.length

The `length` operator is used to retrieve the length of a Array.

### Parameters

#### array
The array whose length you want to retrieve.

### Return Value
An integer representing the size of the array.

```
let weekdays = [| "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" |];

Array.length weekdays;

/* returns 7 */
```

### Array.length type definition
```
let length: array 'a => int;
```

### Syntax
```
Array.length [| array |]
```
