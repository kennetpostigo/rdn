# Modules

> If you haven't read the [Core Language Overview](/reader/guides/native/anIntroductionToReason/coreLanguage/coreLanguage) please do before diving deeper.

Modules in Reason give you the ability to wrap up units of code into reusable pieces that you may include in other parts of your codebase. Modules may contain types or values or both. How do modules look?

```reason
Reason # module Cool = {
/* cool stuff up in hurr */
};
module Cool : { }
```

First things that should catch your eye is that we use `module` keyword instead of the `let` keyword to bind a module to an identifier. Which in this case is `Cool` . Lets populate `Cool` now:

```reason
Reason # module Cool = {
  type rate = int;
  let coolMeter (rating: rate) : string => {
    if (rating <= 5) {
      "Not Cool";
    } else {
      "Cool";
    }
  };
};
module Cool : { type rate = int; let coolMeter : rate => string; }
```

As you can see after the `Cool` module definition we are returned the signature of the module. You can access the contents of a module similar to how you access fields on a record. Now we can use the functions and types that `Cool` exposes:

```reason
Reason # let tv : Cool.rate = 5;
let tv : int = 5

Reason # let computer : Cool.rate = 10;
let computer : int = 10

Reason # Cool.coolMeter tv;
- : string = "Not Cool"

Reason # Cool.coolMeter computer;
- : string = "Cool"
```

#### Rebinding Modules

When using modules you defined or third party modules in your codebase they may have really long names and it can get really bothersome to constantly type them especially if they are used often. To avoid this you may also bind the module to another identifier:

```reason
Reason # module C = Cool;
module C = Cool

Reason # let tv : C.rate = 5;
let tv : int = 5

Reason # let computer : C.rate = 10;
let computer : int = 10

Reason # C.coolMeter tv;
- : string = "Not Cool"

Reason # C.coolMeter computer;
- : string = "Cool"
```

#### Extending Modules

Modules can be extended with additional functionality by using the `include` keyword. When using the include keyword the module has access to all the modules content:

```reason
Reason # module Cool = {
  type rate = int;
  let coolMeter (rating: rate) : string => {
    if (rating <= 5) {
      "Not Cool";
    } else {
      "Cool";
    }
  };
};
module Cool : { type rate = int; let coolMeter : rate => string; }

Reason # module SuperDuperCool = {
  include Cool;
  let superDuperCoolMeter (rating: rate) : string => {
    "Super Duper " ^ coolMeter rating;
  }
};
module SuperDuperCool :
{
  type rate = int;
  let coolMeter : rate => string;
  let superDuperCoolMeter : rate => string;
}
```

`SuperDuperCool` now has all the functionality and content present in `Cool` because we used `include` , but in addition we defined a new function `superDuperCoolMeter` that uses `coolMeter` and super dupefies the result. We can confirm this because `rtop` returns the module signature. Lets take the new Method out for a spin:

```reason
Reason # SuperDuperCool.superDuperCoolMeter 9;
- : string = "Super Duper Cool"
```

#### Module Signatures

Similar to many data structures in Reason, modules themselves can be typed. In reason you can type modules by using the `module type` combination. Module typing is referred to as module signature or signatures because signatures describe the structure of values and types that a module contains.

Lets take a look at a module signature and a module that implements the signature:

```reason
Reason # module type CoolStringAndRateInt = {
  type rate = int;
  let coolMeter: rate => string;
};
module type CoolStringAndRateInt =
{ type rate = rating; let coolMeter : rate => string; }

Reason # module Cool: CoolStringAndRateInt = {
  type rate = int;
  let coolMeter (rating: rate) : string => {
    if (rating <= 5) {
      "Not Cool";
    } else {
      "Cool";
    }
  };
};
module Cool : CoolStringAndRateInt
```

Above we created a `module type` which you can think of as interface or contract that a module must abide by, if it doesn't then the compiler will make sure to let you know and throw a type mismatch.

In the code above `CoolStringAndRateInt` signature defines a type `int` for the `rate` field. Followed by that, we define a value `coolMeter` . However it may look odd because we don't use `=` when defining it `let coolMeter: rate => string;` This is because we are defining an interface to of a value.

Finally we revisit the `Cool` module and we set it's signature `module Cool: CoolStringAndRateInt { ... }` . This will enforce the module to abide by the signature, lets take a look:

```reason
Reason # module type CoolStringAndRateInt = {
  type rate = int;
  let coolMeter: rate => string;
};
module type CoolStringAndRateInt =
{ type rate = rating; let coolMeter : rate => string; }

Reason # module Cool: CoolStringAndRateInt = {
  let coolMeter (rate: int) : string => {
    if (rate <= 5) {
      "Not Cool";
    } else {
      "Cool";
    }
  };
};
Error: Signature mismatch:
Modules do not match:
{ let coolMeter : int => string; }
is not included in
CoolStringAndRateInt
The type `rate' is required but not provided
```

If we we're to omit anything specified in the module signature Reason will point it out immediately. This is great from a maintenance and refactoring stand point. Because as soon as the interface of a module changes Reason will tell you about it and help you keep your modules and other code in you codebase that depend on your module stay up to date.

With that said as long as we satisfy the module signature we get no problems. What if we add more fields or types to a module than what is defined in the signature? 🤔

```reason
Reason # module type CoolStringAndRateInt = {
  type rate = int;
  let coolMeter: rate => string;
};
module type CoolStringAndRateInt =
{ type rate = int; let coolMeter : rate => string; }

Reason # module Cool: CoolStringAndRateInt = {
  type rate = int;
  let coolMeter (rate: rate) : string => {
    if (rate <= 5) {
      "Not Cool";
    } else {
      "Cool";
    }
  };
  let popularityMeter (rate: rate) : string => {
    if (rate <= 5) {
      "Not Popular";
    } else {
      "Popular";
    }
  };
};
module Cool : CoolStringAndRateInt
```

Well, if we we're to include additional types or values that we're not defined in the signature they would be hidden. Constraining Modules to a signature might be something you want depending on what you are using it for, it could be useful for hiding implementation details of a module while exposing a public API for the module. Lets take a look and make for certain this is the case:

```reason
Reason # module type CoolStringAndRateInt = {
  type rate = int;
  let coolMeter: rate => string;
};
module type CoolStringAndRateInt =
{ type rate = int; let coolMeter : rate => string; }

Reason # module Cool: CoolStringAndRateInt = {
  type rate = int;
  let coolMeter (rate: rate) : string => {
    if (rate <= 5) {
      "Not Cool";
    } else {
      "Cool";
    }
  };
  let popularityMeter (rate: rate) : string => {
    if (rate <= 5) {
      "Not Popular";
    } else {
      "Popular";
    }
  };
};
module Cool : CoolStringAndRateInt

Reason # Cool.coolMeter 6;
- : string = "Cool"

Reason # Cool.popularityMeter 5;
Error: Unbound value Cool.popularityMeter
```

As soon as we reach for `popularityMeter` which was not defined in the module signature `CoolStringAndRateInt` Reason lets us know that it's an unbound value, and in effect hiding it from the public API.

#### Interface Files

In reason you typically write your code in a `.re` file and this implicitly creates a module that has the capitalized name of the file. However there are also interface reason files with the `.rei` extension, that will create a module signature for the corresponding `.re` file.

So lets say we define a `Cool.re` file with the following contents:

```reason
type rate = int;
let coolMeter (rate: rate) : string => {
  if (rate <= 5) {
    "Not Cool";
  } else {
    "Cool";
  }
};
```

With a corresponding `Cool.rei` file :

```reason
type rate = int;
let coolMeter: rate => string;
```

In this case the `Cool.rei` file will constrain the `Cool.re` file because it will contain the module signature of `Cool.re` . Aside from this `.rei` files can be useful to developers because you can quickly scan over the public API of the corresponding `.re` file.
