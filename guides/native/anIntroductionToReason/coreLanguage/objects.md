# Objects \(WIP\)

> If you haven't read the [Core Language Overview](/reader/guides/native/anIntroductionToReason/coreLanguage/coreLanguage) please do before diving deeper.

### Reason Objects

Reason supports programming with Classes and construct Objects from classes. However, Reasons Object Oriented Programming model is different from the model C++, Java, etc. because you can use standalone objects without classes. Classes are used in Reason to enable inheritance. Objects also have object types that can determine whether an object is open or closed.

```reason
Reason # let car = {
  val mutable isMoving = false;
  pub drive => isMoving = true;
  pub getState => isMoving;
};
let car : < drive : unit, getState : bool > = <obj>

Reason # car#drive;
- : unit = ()

Reason # car#getState;
- : bool = true
```


