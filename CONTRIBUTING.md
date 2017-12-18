# Contributing

## Prerequisites

[Node.js](http://nodejs.org/) >= v4 must be installed.

## Installation

* Running `yarn` or `npm install` in the components's root directory will install everything you need for development.

## Demo Development Server

* `npm run demo:start` will run a development server with the component's demo app at [http://localhost:1190](http://localhost:1190) with hot module reloading.

## Linting

* `npm run lint` will lint the `src` and `demo/src` folders

## Running Tests

* `npm test` will run the tests once and produce a coverage report in `coverage/`.

* `npm run test:watch` will run the tests on every change.

## Building

* `npm run build` will build the component for publishing to npm and also bundle the demo app.

* `npm run clean` will delete built resources.

> **Builds:**
>
> * CommonJS build => `/lib`,
> * ES6 modules build => `/es`
> * UMD build => `/umd`
> * Demo build => `/demo/dist`
