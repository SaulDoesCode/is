is.js small type testing library for node and the web

```javascript
  const is = require('is');

  is.Arr([1,2,3,4]) // -> true

  is.Object({ a : 1 , b : 2}) // -> true

  is.eq('string one', 'string one') // ->  true

  is.eq('string two')('string two') // -> true
```

#### API

##### is

is - Type Testing / Assertion
main object with all the methods

###### Alphanumeric

Determine if a String contains only characters and numbers (alphanumeric)

**Parameters**

-   `str` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

###### Args

Tests if a value is an arguments object

**Parameters**

-   `variable` **...Any** to test

###### Arr

Test if something is an Array

**Parameters**

-   `args`  value/values to test

###### Array

Array.isArray alias for convenience and performance when only one argument is present

**Parameters**

-   `val` **Any** value to test

###### Arraylike

Test if something is an Array-Like

**Parameters**

-   `args`  value/values to test

###### Between

Determines whether a Number is between a maximum and a minimum

**Parameters**

-   `val` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** number value to test
-   `max` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** maximum to compare the value with
-   `min` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** minimum to compare the value with

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** wether or not the value is between the max and min

###### Blob

Determine if a variable is of Blob type

**Parameters**

-   `obj`  variable to test

###### Bool

Test if something is a boolean type

**Parameters**

-   `val`  value to test

###### bt

Determines if a number is BIGGER than another

**Parameters**

-   `val` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** value to test
-   `other` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** num to test with value

###### bte

Determines if a number is BIGGER than or equal to another

**Parameters**

-   `val` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** value to test
-   `other` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** num to test with value

###### Date

Determine if a variable is a Date type

**Parameters**

-   `variable` **...Any** to test

###### dateString

Determines whether a String is a dateString

**Parameters**

-   `dateString` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

###### Def

Determine whether a variable is in fact defined

**Parameters**

-   `args`  value/values to test

###### Element

Determine if a variable is a HTMLElement

**Parameters**

-   `args`  value/values to test

###### Email

Determines whether a String is a valid Email

**Parameters**

-   `email` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

###### empty

Determine if a given collection or string is empty

**Parameters**

-   `val` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)\|[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** value to test if empty

###### eq

Determines if two variables are equal

**Parameters**

-   `a`  first value to compare
-   `b`  second value to compare

###### even

checks if a number is an even number

**Parameters**

-   `val`  variable / value to test

###### False

Determine if a variable/s are false

**Parameters**

-   `args`  value/values to test

###### File

Determine if a variable is a File Object

**Parameters**

-   `args`  value/values to test

###### FormData

Determine if a variable is of a FormData type

**Parameters**

-   `args`  value/values to test

###### Func

Determine if a variable is a function

**Parameters**

-   `args`  value/values to test

###### future

Determines if a date is in the future

**Parameters**

-   `obj`  Date to test

###### hexadecimal

Determines whether a String is hexadecimal

**Parameters**

-   `hexadecimal` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

###### HexColor

Determines whether a String is a HEX-COLOR (#fff123)

**Parameters**

-   `HexColor` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

###### int

checks if a number is an integer

**Parameters**

-   `val`  variable / value to test

###### Json

Determine if a sring is JSON

**Parameters**

-   `args`  value/values to test

###### Lowercase

Determine if a String is LOWERCASE

**Parameters**

-   `char` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

###### lt

Determines if a number is LOWER than another

**Parameters**

-   `val` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** value to test
-   `other` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** num to test with value

###### lte

Determines if a number is LOWER than or equal to another

**Parameters**

-   `val` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** value to test
-   `other` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** num to test with value

###### Map

Determine if a variable is a Map

**Parameters**

-   `args`  value/values to test

###### Native

Test if something is a Native JavaScript feature

**Parameters**

-   `val`  value to test

###### negative

checks if a number is positive

**Parameters**

-   `val`  variable / value to test

###### Node

Determine whether a variable is a DOM Node

**Parameters**

-   `args`  value/values to test

###### NodeList

Determine whether a variable is a DOM NodeList or Collection of Nodes

**Parameters**

-   `args`  value/values to test

###### not

Determines if two variables are equal

**Parameters**

-   `a`  first value to compare
-   `b`  second value to compare

###### Null

Determine whether a variable is null

**Parameters**

-   `args`  value/values to test

###### Num

Determine if a variable is a Number

**Parameters**

-   `args` **...Any** value/values to test

###### Object

Determine if a variable is an Object

**Parameters**

-   `args`  value/values to test

###### odd

checks if a number is an odd number

**Parameters**

-   `val`  variable / value to test

###### past

Determines if a date is in the past

**Parameters**

-   `obj`  Date to test

###### positive

checks if a number is positive

**Parameters**

-   `val`  variable / value to test

###### RegExp

Determine if a variable is a Regular Expression

**Parameters**

-   `obj`  variable to test

###### Set

Determine if a variable is a Set

**Parameters**

-   `obj`  variable to test

###### String

Test if something is a String

**Parameters**

-   `args`  value/values to test

###### Symbol

Determine if a variable is a Symbol

**Parameters**

-   `obj`  variable to test

###### Tag

Test an element's tagname

**Parameters**

-   `element` **[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)** node to test
-   `tag` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** tag to test node for

###### time

Determines whether a String is a timeString

**Parameters**

-   `time`  variable to test

###### today

checks wether a date is today

**Parameters**

-   `obj`  Date to test

###### tomorrow

checks wether a date is tommorow

**Parameters**

-   `obj`  Date to test

###### True

Determine if a variable/s are true

**Parameters**

-   `args`  value/values to test

###### Undef

Determine whether a variable is undefined

**Parameters**

-   `args`  value/values to test

###### Uppercase

Determine if a String is UPPERCASE

**Parameters**

-   `char` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

###### URL

Determines whether a String is a URL

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

###### yesterday

checks wether a date is yesterday

**Parameters**

-   `obj`  Date to test

##### root

is.js a small es6 type testing toolkit
for the web and node

**Meta**

-   **copyright**: MIT Licence (c) 2016 Saul van der Walt
-   **author**: github.com/@SaulDoesCode
