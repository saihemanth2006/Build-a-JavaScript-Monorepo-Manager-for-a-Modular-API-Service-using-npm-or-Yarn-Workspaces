const test = require('node:test');
const assert = require('node:assert/strict');
const { userCreateSchema } = require('../src/user');

test('accepts a valid user', () => {
  assert.equal(userCreateSchema.safeParse({ name: 'Jane Doe', email: 'jane@example.com' }).success, true);
});

test('rejects a user without an email', () => {
  assert.equal(userCreateSchema.safeParse({ name: 'Jane Doe' }).success, false);
});