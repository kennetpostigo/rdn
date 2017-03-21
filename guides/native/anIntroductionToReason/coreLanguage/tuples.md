# Tuples

> If you haven't read the [Core Language Overview](/reader/guides/native/anIntroductionToReason/coreLanguage/coreLanguage) please do before diving deeper.

Tuples are a simple data structure that can hold a fixed number of values of any type. They are often useful for returning multiple values from a function. Lets take a look at a quick exampled of a tuple:

```reason
Reason # let dbz = ("Goku", "Vegeta");
let dbz : (string, string) = ("Goku", "Vegeta")

Reason # let dwyaneWade = ("sg", 3);
let dwyaneWade : (string, int) = ("sg", 3)
```

Tuples must always be wrapped in parenthesis and are separated by commas. Lets return a tuple from a function:

```reason
Reason # let tupler => (2, "tuple");
let tupler : unit => (int, string) = <fun>
```

How do we type our tuples? You can type tuples in 2 ways, type annotating inline or type aliasing them:

```reason
Reason # let dwyaneWade : (string, int) = ("sg", 3);
let dwyaneWade : (string, int) = ("sg", 3)

Reason # type player = (string, int);
type player = (string, int)

Reason # let dwyaneWade : player = ("sg", 3);
let dwyaneWade : player = ("sg", 3)
```

You can generally type most things in that way. The nice part about tuples is that you can easily destructure them to pull off what you need:

```reason
Reason # type player = (string, int);
type player = (string, int)

Reason # let dwyaneWade : player = ("sg", 3);
let dwyaneWade : player = ("sg", 3)

Reason # let (p, n) = dwyaneWade;
let p : string = "sg"
let n : int = 3
```

As seen above we have assigned two variables _p_ and _n_ to the values from Dwyane Wade.Tuples are simple and should usually be used for simple use cases. Tuples are not a drop in replacement for Lists or Records.
