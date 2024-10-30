import 'dotenv/config';

import * as joi from 'joi';

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});
if (error) throw new Error('Config validation issue ' + error.message);

export const env = {
  port: value.PORT,
  natsServers: value.NATS_SERVERS,
};
