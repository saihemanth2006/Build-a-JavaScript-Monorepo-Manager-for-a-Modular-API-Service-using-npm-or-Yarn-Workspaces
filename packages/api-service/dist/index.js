const express = require('express');
const { userCreateSchema } = require('@modular-api/data-models');
const { logger } = require('@modular-api/shared-utils');

const app = express();
app.use(express.json());

app.get('/health', (_request, response) => response.json({ status: 'ok' }));

app.post('/users', (request, response) => {
  const result = userCreateSchema.safeParse(request.body);
  if (!result.success) {
    return response.status(400).json({ error: 'Invalid user data', details: result.error.issues });
  }

  logger.info({ email: result.data.email }, 'New user created');
  return response.status(201).json({ message: 'User created', user: result.data });
});

const port = Number(process.env.API_PORT || 3000);
if (require.main === module) {
  app.listen(port, () => logger.info({ port }, 'API service listening'));
}

module.exports = { app };