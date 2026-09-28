const test = require('node:test');
const assert = require('node:assert/strict');
const { logger } = require('../src/logger');

test('exports a configured logger', () => {
  assert.equal(typeof logger.info, 'function');
});