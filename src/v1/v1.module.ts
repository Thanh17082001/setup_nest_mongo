import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from 'src/config/database.config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { ExamplesModule } from './modules/examples/examples.module';
import { CaslModule } from './modules/casl/casl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
   MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          uri: configService.get<string>('MONGODB_URI'),
        }),
      }),
    UsersModule,
    AuthModule,
    ExamplesModule,
    CaslModule
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD, // Đăng ký AuthGuard cho tất cả các route
    useClass: AuthGuard,
  }],
})
export class AppModule {}
