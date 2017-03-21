# Records

> If you haven't read the [Core Language Overview](/reader/guides/native/anIntroductionToReason/coreLanguage/coreLanguage) please do before diving deeper.

Records in Reason are the go-to `key:value` data structure you should use when ever the need for it arises. They are similar to Objects in Javascript and Dictionaries in Python with a few differences.

Before using a record you must make sure do define the shape the record will take:

```reason
Reason # type hero = {name: string, power: string, age: int};
type hero = { name : string, power : string, age : int, }
```

Once you've got that done you can now go ahead and start creating records that implement the definition above.

```reason
Reason # let superman = {name: "superman", power: "everything that matters", age: 35};
let superman : hero =
{name : "superman", power : "everything that matters", age : 35}

Reason # let flash = {name: "flash", power: "super speed", age: 25};
let flash : hero = {name : "flash", power : "super speed", age : 25}
```

What happens if we don't follow the type definition of the record?

```reason
Reason # let aquaman = {name: "aquaman", age: 50};
Error: Some record fields are undefined: power

Reason # let aquaman = {name: "aquaman", power: "power?", age: 50, marvelMovie: false};
Error: Unbound record field marvelMovie
```

Well Reason loses its mind! Nah, it just lets you know that you aren't following the type definition and the proceeds to list the fields that violate the type definition. Pretty neat huh?

#### Updating Record Fields

Records in Reason are special when it comes to updating fields. You can do this in 2 ways, immutable updates and mutable updates.

```reason
Reason # type person = {name: string, age: int};
type person = { name : string, age : int, }

Reason # let bob = {name: "bob", age: 22};
let bob : person = {name : "bob", age : 22}

Reason # let birthday person => {...person, age: person.age + 1};
let birthday : person => person = <fun>

Reason # let bob = birthday bob;
let bob : person = {name : "bob", age : 23}
```

Here we are defined a `person` type, and created a variable called `bob` that is of type `person`. Then create a function called `birthday` that takes a `person` record and creates a new record with the age incremented. You must be wondering what the `{...person}` piece of code is doing, that is called destructuring, it is a technique that is used to extract one or more fields from record. So in this case the `...person` is extracting the `name` field off of the `person` record and being placed on the record returned from the `birthday` function.

The second way to update a field on a record is to mark that field `mutable` on the `person` type definition. Lets update the type definition and show it in action:

```reason
Reason # type person = {name: string, mutable age: int};
type person = { name : string, mutable age : int, }

Reason # let bob = {name: "bob", age: 22};
let bob : person = {name : "bob", age : 22}

Reason # let birthday person => person.age = person.age + 1;
let birthday : person => unit = <fun>

Reason # birthday bob;
- : unit = ()

Reason # bob;
- : person = {name : "bob", age : 23}
```

Once you update the type definition to and mark `age` field with the `mutable` keyword you can freely update the `age` field on `bob` . Now we simply just reassign the `person.age` and set it equal to `person.age + 1` in the `birthday` function and it will mutate the `bob` record directly.

#### Record Field Punning

In reason if you are creating a record with values that already exist and the variable name matches the record field you don't need to give the field a label and value, just the label. Lets take a look at how we would Traditionally create a record and then lets show the same example with field punning

```reason
// Without Punning
Reason # let name = "John Doe";
let name : string = "John Doe"

Reason # let basicPerson = {name: name, age: 21};
let basicPerson : person = {name : "John Doe", age : 21}

//With Punning
Reason # let name = "John Doe";
let name : string = "John Doe"

Reason # let basicPerson = { name, age: 21};
let basicPerson : person = {name : "John Doe", age : 21}
```

The difference is subtle `name: name` vs `name` , you can choose whichever style you prefer they both have the same end result.

#### Record Destructuring

You can destructure one or many fields from a record and bind them to a variables.

```reason
Reason # type player = {position: string, number: int};
type player = { position : bytes, number : int, }

Reason # let dwyaneWade : player = {position: "sg", number: 3};
let dwyaneWade : player = {position : "sg", number : 3}

Reason # let {position: p, number: n} = dwyaneWade;
let p : bytes = "sg"
let n : int = 3
```


