# Functors

> If you haven't read the [Core Language Overview](/reader/guides/native/anIntroductionToReason/coreLanguage/coreLanguage) please do before diving deeper.

Module Functions are commonly referred to as Functors in the OCaml Reason Community. Functors are special functions that can operate on modules. They give you the power to pass modules and signatures through functions to extend the behavior of modules, help structure your code better, and instantiate modules with state and more!

Lets take a look at usage of functors:

```reason
Reason # module type Car = {
  type y = int;
  type m = string;
  let year: y;
  let make: m;
};
module type Car =
{ type y = int; type m = string; let year : y; let make : m; }

Reason # module SpeedRacin = fun (C: Car) => {
  type whip = {year: C.y, make: C.m};
  let myWhip = {year: C.year, make: C.make};
  let drive (w: whip) =>
    "Pull off the lot in my " ^ string_of_int w.year ^ " " ^ w.make ^ " Speed Racin!";
};
module SpeedRacin :
(C : Car) => {
  type whip = { year : year, make : make, };
  let myWhip : whip;
  let drive : whip => make;
}
```

What we've done is first define a module signature `Car` so that we can use it when typing the module parameter of the functor `SpeedRacin` . In the `SpeedRacin` module function/functor there should be a few things that stand out to you. First that we bind the function to `module` rather than `let`. Second that we distinguish `SpeedRacin` as functor vs a regular module by using the `fun` keyword. Within the body of the functor we define the `whip` record type and the record value `myWhip` both which depend on types and values from the `C` parameter passed in. Finally we finish the functor off by defining the `drive` function that will output a string with the values of a record of type `whip` .

Now lets see the functor in action:

```reason
Reason # module Honda1996 = {
  type y = int;
  type m = string;
  let year = 1996;
  let make = "Honda";
};
module Honda1996 :
{ type y = year; type m = make; let year : y; let make : m; }


Reason # module HondaGoVroom = SpeedRacin Honda1996;
module HondaGoVroom :
{
  type whip = SpeedRacin(Honda1996).whip = { year : year, make : make, };
  let myWhip : whip;
  let drive : whip => make;
}


Reason # let speedinOffInWhat = HondaGoVroom.drive HondaGoVroom.myWhip;
let speedinOffInWhat : make = "Pull off the lot in my 1996 Honda Speed Racin!"
```

Before we put the functor to use, lets define module `Honda1996` so that we can pass it to the functor as a parameter. `Honda1996` seems to implement the `Car` signature but we don't type it explicitly when defining it. Now, lets use the functor! We're going to define a module `HondaGoVroom` that is going to be set to the module that our `SpeedRacin` functor returns. We pass `SpeedRacin` our `Honda1996` module which from the definition of `SpeedRacin` must implement the `Car` signature. This is because we set the parameter type to `Car` it will constrain the parameter to the `Car`'s signature. After we run the code we are returned a module from the functor that is bound to `HondaGoVroom` .

Lastly, we invoke the `HondaGoVroom.drive` function and pass it the `HondaGoVroom.myWhip` record, and it will successfully output `"Pull off the lot in my 1996 Honda Speed Racin!"` and bind it to `speedinOffInWhat` variable.

Just like that, we're using functors! Since functors return modules can we type them as well? The answer is yes! We do it the same way we constrain regular modules:

```reason
Reason # module type Car = {
  type y = int;
  type m = string;
  let year: y;
  let make: m;
};
module type Car =
{ type y = int; type m = string; let year : y; let make : m; }


Reason # module type Racin = (SpeedRacinCar: Car) => {
  type whip = {year: SpeedRacinCar.y, make: SpeedRacinCar.m};
  let myWhip: whip;
  let drive: whip => string;
};
module type Racin =
(SpeedRacinCar : Car) => {
  type whip = { year : int, make : string, };
  let myWhip : whip;
  let drive : whip => string;
}


Reason # module SpeedRacin: Racin = fun (C: Car) => {
  type whip = {year: C.y, make: C.m};
  let myWhip = {year: C.year, make: C.make};
  let drive (w: whip) =>
    "Pull of the lot in my " ^ string_of_int w.year ^ " " ^ w.make ^ " Speed Racin!";
};
module SpeedRacin : Racin
```

This should look familiar to you! The only difference is that we assert the `Racin` type on the functor just like we would on modules `module SpeedRacin: Racin`.
