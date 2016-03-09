# toggle-gist-star

[![NPM version](https://img.shields.io/npm/v/toggle-gist-star.svg)](https://www.npmjs.com/package/toggle-gist-star)
[![Build Status](https://travis-ci.org/shinnn/toggle-gist-star.svg?branch=master)](https://travis-ci.org/shinnn/toggle-gist-star)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/toggle-gist-star.svg)](https://coveralls.io/github/shinnn/toggle-gist-star)
[![Dependency Status](https://david-dm.org/shinnn/toggle-gist-star.svg)](https://david-dm.org/shinnn/toggle-gist-star)
[![devDependency Status](https://david-dm.org/shinnn/toggle-gist-star/dev-status.svg)](https://david-dm.org/shinnn/toggle-gist-star#info=devDependencies)

Unstar the [gist](https://gist.github.com/) if you've already starred it, otherwise star it

```javascript
const toggleGistStar = require('toggle-gist-star');

const token = 'xxx'; // your Github API access token
const gistId = '908bced575270f6ef80e';

toggleGistStar(gistId, {token})
.then(() => {
  console.log('Starred https://gist.github.com/908bced575270f6ef80e');
  return toggleGistStar(gistId, {token});
})
.then(() => {
  console.log('Unstarred https://gist.github.com/908bced575270f6ef80e');
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install toggle-gist-star
```

## API

```javascript
const toggleGistStar = require('toggle-gist-star');
```

### toggleGistStar(*gistId* [, *options*])

*gistId*: `String` (a gist ID, for example <https://gist.github.com/tim/34309> → `'34309'`)  
*options*: `Object` ([`gh-get` options](https://github.com/shinnn/gh-get#options))  
Return: [`Promise`](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor) instance

It [checks if a gist with the given ID is starred or not](https://github.com/shinnn/is-gist-starred), then [unstars it](https://github.com/shinnn/unstar-gist) if it's already starred by the authenticated user, otherwise [stars it](https://github.com/shinnn/star-gist).

The promise will be [*fulfilled*](https://promisesaplus.com/#point-26) with an [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_http_incomingmessage) object if successful, otherwise [*rejected*](https://promisesaplus.com/#point-30) with an error.

```javascript
toggleGistStar('ab12852099', {token: 'xxxxxx'}).catch(err => {
  err.message;
  //=> '404 Not Found (Gist not found: https://gist.github.com/ab12852099)'
});

toggleGistStar('2790533', {token: 'invalid_token'}).catch(err => {
  err.message;
  //=> '401 Unauthorized (Bad credentials)'
});
```

## License

Copyright (c) 2016 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
