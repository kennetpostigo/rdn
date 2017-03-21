# List 

The List Module contains functions that operate on the `List` data structure.
`List`'s are immutable collection data structure that is used most often and 
by default in Reason.

#### Create a List

```
let pets = ["dog", "cat", "rabbit"];
```

#### Type this `List` by inlining the type

```
let pets: list string = ["dog", "cat", "rabbit"];
```

#### Type the list once again using a type alias:

```
type indoorPets = list string; 
let pets: indoorPets  = ["dog", "cat", "rabbit"];
```

### Syntax
```
[element0, element1, ..., elementN]
```