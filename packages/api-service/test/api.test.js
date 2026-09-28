const test = require('node:test');
const assert = require('node:assert/strict');
const { app } = require('../src/index');

function request(body) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const http = require('node:http');
      const client = http.request({ port: server.address().port, path: '/users', method: 'POST', headers: { 'content-type': 'application/json' } }, response => {
        response.resume();
        response.on('end', () => { server.close(); resolve(response.statusCode); });
      });
      client.on('error', error => { server.close(); reject(error); });
      client.end(JSON.stringify(body));
    });
  });
}

test('creates a valid user', async () => assert.equal(await request({ name: 'Jane Doe', email: 'jane@example.com' }), 201));
test('rejects an invalid user', async () => assert.equal(await request({ name: 'Jane Doe' }), 400));