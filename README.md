# Tweet CLI

by [Nicholas C. Zakas](https://humanwhocodes.com)

![Node CI](https://github.com/nitpik/toolkit/workflows/Node%20CI/badge.svg)

If you find this useful, please consider supporting my work with a [donation](https://humanwhocodes.com/donate).

## Description

A simple CLI for sending tweets. This is intended for use in CI systems such as GitHub actions in order to enable to Twitter notifications of important events.

## Usage

You must have Node.js to use this package. Install using [npm][npm] or [yarn][yarn]:

```
npm install @humanwhocodes/tweet

# or

yarn add @nitpik/toolkit
```

Import into your Node.js project:

```js
// CommonJS
const { NitpikTokenList } = require("@nitpik/toolkit");

// ESM
import { NitpikTokenList } from "@nitpik/toolkit";
```

### Developer Setup

1. Ensure you have [Node.js](https://nodejs.org) 12+ installed
2. Fork and clone this repository
3. Run `npm install`
4. Run `npm test` to run tests

## License and Copyright

This code is licensed under the Apache 2.0 License (see LICENSE for details).

Copyright Human Who Codes LLC. All rights reserved.
