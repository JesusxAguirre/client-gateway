import 'dotenv/config';

import * as joi from 'joi';


const envSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),
}).unknown(true);


const { error, value } = envSchema.validate(process.env,);
if (error) throw new Error('Config validation issue');

export const env = {
    port: value.PORT,
    productsMicroserviceHost: value.PRODUCTS_MICROSERVICE_HOST,
    productsMicroservicePort: value.PRODUCTS_MICROSERVICE_PORT,
    ordersMicroserviceHost: value.ORDERS_MICROSERVICE_HOST,
    ordersMicroservicePort: value.ORDERS_MICROSERVICE_PORT,
}

