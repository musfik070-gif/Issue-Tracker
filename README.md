# 1. Difference between var, let, and const

In JavaScript var, let,and const are used to declare variables, but there are some difference between them.

var: 
-var is the older way to declare variables.
-It is function scoped.
-It can be redeclared and updated.

let:
-let is block scoped.
-It can be updated but cannot be redeclared in the same scope.

const:
-const is also block scoped.
-It cannot be updated or redeclared.
-It is used when the value should stay constant.

# 2. What is the Spread Operator (...)

The spread operator "..." allows to expand elements of an array or object.It is useful when it needs to copy or merge data.

# 3. Difference between map(), filter(), and forEach()

These map(), filter(), and forEach() methods are used to work with arrays.

1.map():
-Creates a new array.
-Transforms each element.

2.filter():
-Returns a new array with elements that match a condition.

3.forEach():
-Loops through each element.
-Does not return a new array.

# 4. What is an Arrow Function?

Arrow functions are a shorter way to write functions in JavaScript.
Example:
const add = (a,b) => a + b;

# 5. What are Template Literals?

Template literals allow me to write strings using backticks  "` `" .
They allow inserting variables inside strings using `${}`.

Example:
card.innerHTML = `
<h4>${issue.title}</h4>
`;
