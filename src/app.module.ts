import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { FileService } from './file/file.service';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';
import { File } from './file/file.entity';

@Module({
  imports: [UserModule,ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      port:5432,
      host:'localhost',
      database:process.env.DATABASE_NAME,
      password:process.env.DATABASE_PASSWORD,
      username:process.env.DATABASE_USERNAME,
      autoLoadEntities:true, 
      synchronize:true
    }),TypeOrmModule.forFeature([User,File])
  ],
  controllers: [AppController, UserController, FileController],
  providers: [AppService,UserService, FileService],
})
export class AppModule {}
