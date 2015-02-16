/* global describe, it, require */
'use strict';

var assert = require('chai').assert,
    expect = require('chai').expect,
    server = require('./server');

describe('server', function() {
  it('should expose a number function', function() {
    expect(server.number()).to.equal(3);
  });
});
