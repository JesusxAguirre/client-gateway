import 'dotenv/config';

import * as joi from 'joi';


const envSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
}).unknown(true);


const { error, value } = envSchema.validate(process.env,);
if (error) throw new Error('Config validation issue');

export const env = {
    port: value.PORT,
    productsMicroserviceHost: value.PRODUCTS_MICROSERVICE_HOST,
    productsMicroservicePort: value.PRODUCTS_MICROSERVICE_PORT,
}

