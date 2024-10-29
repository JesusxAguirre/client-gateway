import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './core';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/V1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(env.port);

  logger.log(`Application is running on: ${env.port}`);
}
bootstrap();
