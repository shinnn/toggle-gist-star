/*!
 * toggle-gist-star | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/toggle-gist-star
*/
'use strict';

const isGistStarred = require('is-gist-starred');
const starGist = require('star-gist');
const unstarGist = require('unstar-gist');

const USER_AGENT = 'https://github.com/shinnn/toggle-gist-star';

module.exports = function toggleGistStar(gistId, options) {
  if (options) {
    options.headers = Object.assign({'user-agent': USER_AGENT}, options.headers);
  } else {
    options = {
      headers: {
        'user-agent': USER_AGENT
      }
    };
  }

  return isGistStarred(gistId, options).then(function starOrUnstarGist(starred) {
    return (starred ? unstarGist : starGist)(gistId, options);
  });
};
