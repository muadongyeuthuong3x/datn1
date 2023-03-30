import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.useStaticAssets(join(__dirname, '..', 'public')); 
  app.setViewEngine('html');
  app.enableCors({
    origin:true,
    methods: ["GET", "POST" , "PUT", "DELETE", "PATCH"],
    credentials: true,
  });
  app.setGlobalPrefix('api');

  // const options = new DocumentBuilder()
  // .setTitle('NestJS Realworld Example App')
  // .setDescription('The Realworld API description')
  // .setVersion('1.0')
  // .setBasePath('api')
  // .addBearerAuth()
  // .build();

  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('/docs', app, document);

   await app.listen(5000);
}
bootstrap();
