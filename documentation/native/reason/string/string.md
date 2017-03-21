# String 

The String Module contains functions that operate on the `String` data structure.
`String`'s are an immutable data structure that contains a fixed-length sequence of (single-byte) characters. These are used by default in Reason.

#### Create a String

```
let name = "John Doe";
```

#### Type this string by inlining the type

```
let name: string = "John Doe";
```

#### Type the string once again using a type alias:

```
type personName = string; 
let name: personName = "John Doe";
```

### Syntax
```
"string text"
```