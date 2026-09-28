const { z } = require('zod');

const userCreateSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email()
}).strict();

module.exports = { userCreateSchema };