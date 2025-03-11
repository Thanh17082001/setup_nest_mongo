import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './v1.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';



async function bootstrap() {

  //version api
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const versionApi = configService.get<string>('VERSION') || 'api/v1';

  
  // set global route
  app.setGlobalPrefix(versionApi); 

  //html exceptions
  app.useGlobalFilters(new HttpExceptionFilter());

  // config swagger document api
  const config = new DocumentBuilder()
    .setTitle('API USING NEST')
    .setDescription('Author: Nguyen Thien Thanh')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(versionApi, app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha', // Sắp xếp các tag theo thứ tự từ A-Z
      persistAuthorization: true,
    },
  });
  //middleware
    //custom transform
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

    //custom logging
  app.useGlobalInterceptors(new LoggingInterceptor());

    //validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      disableErrorMessages: true
    }),
  );
    //config server
  const PORT = configService.get<number>('PORT') || 3000;
  await app.listen(PORT, () => {
    console.log(configService.get<string>('database.mongoUri'));
    console.log(`Server is  running at http://localhost:${PORT}/${versionApi}`);
  });
}
bootstrap();
