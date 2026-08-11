### How loyaltyPoints stays private

- we create the variable using let, const or var inside the intended function. let, const and var are function scoped, meaning we can not see the variables created inside the function from outside the function.

- create closure by creating functions inside the outer function that manipulate loyaltyPoints. Only through those functions can we access loyaltyPoints.

This is how we make loyaltyPoints private.
