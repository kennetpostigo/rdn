# Array

The Array Module contains functions that operate on the `Array` data structure.
`Array`'s are mutable collection data structure that is used to in Reason as an 
alternative to `Lists`.

#### Create a Array

```
let pets = [| "dog", "cat", "rabbit" |];
```

#### Type this `Array` by inlining the type

```
let pets: array string = [| "dog", "cat", "rabbit" |];
```

#### Type the array once again using a type alias;

```
type indoorPets = array string;
let pets: indoorPets = [| "dog", "cat", "rabbit" |];
```

### Syntax
```
[| element0, element1, ..., elementN |]
```