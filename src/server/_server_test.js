/* global describe, it, require */
'use strict';

var assert = require('assert');
var server = require('./server');

describe('server', function() {
  it('should expose a number function', function() {
    assert.equal(3, server.number());
    // assert.equal(-1, [1,2,3].indexOf(5));
    // assert.equal(-1, [1,2,3].indexOf(0));
  });
});
