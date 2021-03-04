# Triangle
Displays different types of triangles

# Prerequisites

```
Node >= 14.16.0
NPM >= 6.14.11
```

# Start up
1. ``` npm i ``` -> Installs dependencies
2. ``` npm run start``` -> Spins up the localhost developer environment at port 8080

# Build
``` npm run build ``` -> Creates a dist folder with minified js 

# Test
``` npm run test ``` -> Run the whole test suite through jest

``` npm run test:watch ``` -> Use a watcher

# Architecture overhaul

## Structure

React based application rendering different types of triangles. I was planning of handling the dom natively, but realized that form validation was not part of DLS(https://ui.tradeshift.com/v12/#components/forms/example.html), please do tell me if I am wrong. Therefore I used Formik for form validation. 

The folder structure follows below:

* `src/math`: Is responsible for identifying, drawing and orientating the triangle. It does not actually draw the triangle, but it calculates the coordinates which it should be drawn on. This folder also includes a basic labeling strategy to map labels to the sides of the triangles. The labeling strategy and translations of the triangle are calculated heuristically and should look nice in most cases but I have found some cases where the alignment looks messy.

* `src/form`: Contains validation for the form which are three numbers that represent each side of the triangle. I added the form validation to inform the user of which value is allowed as input.

* `src/components`: Contains the actual react component that is rendered.

* `src/__tests__`: Contains unit tests and interaction tests. A lot of effort was spent here. I try not to write tests just for the sake of writing, but to provide an API of how the modules should be used as well to facilitate maintenance and development of said module.
