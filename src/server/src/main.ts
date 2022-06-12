import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['https://d-corprojects-client.herokuapp.com', 'https://d-corprojects-client.herokuapp.com/uploadProjectImages'],
    // origin: 'http://localhost:3001',
    credentials: true,
    allowedHeaders:
      'Content-Type, Accept, Authorization, X-Requested-With, Origin, X-Csrftoken, X-Xsrftoken',
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
