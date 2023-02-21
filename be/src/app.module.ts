import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { AuthLogin } from './auth-middleware/auth.login';
import { JwtModule } from '@nestjs/jwt';
import { BlockClassModule } from './block_class/block_class.module';
import { ClassModule } from './class/class.module';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BigBlockClassModule } from './big_block_class/big_block_class.module';
import { ExamModule } from './exam/exam.module';
import { ExamFormModule } from './exam_form/exam_form.module';
import { TeacherModule } from './teacher/teacher.module';
@Module({
  imports: [
    JwtModule.register({
      secret: 'dferzxczcbxcvffwe',
      signOptions: {
        expiresIn: '1 hour',
      },
    }),

    DatabaseModule,
    UsersModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),

      })
    }),
    BlockClassModule,
    ClassModule,
    StudentsModule,
    BigBlockClassModule,
    ExamModule,
    ExamFormModule,
    TeacherModule,

  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthLogin)
      .forRoutes(
        { path: 'users', method: RequestMethod.GET },
        // {path: 'users', method: RequestMethod.PUT}
      );
  }
}
 