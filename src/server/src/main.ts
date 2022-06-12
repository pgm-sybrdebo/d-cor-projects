import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    // origin: ['https://artevelde-inventory-client.herokuapp.com', 'https://artevelde-inventory-client.herokuapp.com/uploadDeviceQrCode', 'https://artevelde-inventory-client.herokuapp.com/uploadModelPictures', 'https://artevelde-inventory-client.herokuapp.com/uploadDamagePicture'],
    origin: 'http://localhost:3001',
    credentials: true,
    allowedHeaders:
      'Content-Type, Accept, Authorization, X-Requested-With, Origin, X-Csrftoken, X-Xsrftoken',
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
