# List.length

The `length` operator is used to retrieve the length of a List.

### Parameters

#### list
The list whose length you want to retrieve.

### Return Value
An integer representing the size of the list.

```
let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

List.length weekdays;

/* returns 7 */
```

### List.length type definition
```
let length: list 'a => int;
```

### Syntax
```
List.length [ list ]
```
