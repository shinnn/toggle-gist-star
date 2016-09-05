'use strict';

const isGistStarred = require('is-gist-starred');
const test = require('tape');
const toggleGistStar = require('.');
const unstarGist = require('unstar-gist');

process.env.GITHB_TOKEN = '';

test('toggleGistStar()', t => {
  t.plan(5);

  t.strictEqual(toggleGistStar.name, 'toggleGistStar', 'should have a function name.');

  const params = ['908bced575270f6ef80e', {token: process.env.TOKEN_FOR_TEST}];

  unstarGist(...params)
  .then(() => toggleGistStar(...params))
  .then(response => {
    t.strictEqual(response.headers.status, '204 No Content', 'should be resolved with a response object.');
    return isGistStarred(...params);
  })
  .then(starred => {
    t.strictEqual(starred, true, 'should star the gist if it\'t not starred.');
    return toggleGistStar(...params);
  })
  .then(() => isGistStarred(...params))
  .then(starred => {
    t.strictEqual(starred, false, 'should unstar the gist if it\'s starred.');
  })
  .catch(t.fail);

  toggleGistStar(1).then(t.fail, err => {
    t.strictEqual(
      err.message,
      '1 is not a string. Expected a Gist ID to check if starred. https://gist.github.com/',
      'should fail when it takes an invalid argument.'
    );
  }).catch(t.fail);
});
