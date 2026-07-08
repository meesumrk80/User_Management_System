import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from './file/file.module';
import { JwtModule } from './auth/guards/jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes configuration available everywhere
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: 'localhost',
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USERNAME,
      autoLoadEntities: true, 
      synchronize: true,
    }),
    UserModule,
    FileModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
