import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { AuthLogin } from './auth-middleware/auth.login';
import { JwtModule } from '@nestjs/jwt';
// import { BlockClassModule } from './block_class/block_class.module';
// import { ClassModule } from './class/class.module';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BigBlockClassModule } from './big_block_class/big_block_class.module';
import { ExamModule } from './exam/exam.module';
import { ExamFormModule } from './exam_form/exam_form.module';
import { TeacherModule } from './teacher/teacher.module';
import { RoomModule } from './room/room.module';
import { FormManagementModule } from './form_management/form_management.module';
import { TableExamBigBlockClassModule } from './table_exam_big_block_class/table_exam_big_block_class.module';
import { TableBigClassExamModule } from './table-big-class-exam/table-big-class-exam.module';
import { DepartmentModule } from './department/department.module';
import { TestScheduleStudentModule } from './test_schedule_student/test_schedule_student.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminWeb } from './auth-middleware/admin.web';
import { AuthLoginScore } from './auth-middleware/auth.login.score';
@Module({
  imports: [
    JwtModule.register({
      secret: 'dferzxczcbxcvffwe',
      signOptions: {
        expiresIn: '9 hour',
      },
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // <-- path to the static files
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
      }),
    }),
    // BlockClassModule,
    // ClassModule,
    StudentsModule,
    BigBlockClassModule,
    ExamModule,
    ExamFormModule,
    TeacherModule,
    RoomModule,
    FormManagementModule,
    TableExamBigBlockClassModule,
    TableBigClassExamModule,
    DepartmentModule,
    TestScheduleStudentModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthLogin, AdminWeb).forRoutes(
      { path: 'users', method: RequestMethod.ALL },
      // {path: 'users', method: RequestMethod.PUT}
    );
    consumer
      .apply(AuthLogin)
      .forRoutes({ path: 'big-block-class/(.*)', method: RequestMethod.ALL });
    consumer
      .apply(AuthLogin)
      .forRoutes({ path: 'department/(.*)', method: RequestMethod.ALL });
    consumer
      .apply(AuthLogin)
      .forRoutes({ path: 'exam/(.*)', method: RequestMethod.ALL });
    consumer
      .apply(AuthLogin)
      .forRoutes({ path: 'exam_form/(.*)', method: RequestMethod.ALL });
    consumer
      .apply(AuthLogin)
      .forRoutes({ path: 'form-management/(.*)', method: RequestMethod.ALL });
    consumer.apply(AuthLogin).forRoutes({
      path: 'item-room-exam-and-teacher',
      method: RequestMethod.ALL,
    });
    consumer
      .apply(AuthLogin)
      .forRoutes({ path: 'room/(.*)', method: RequestMethod.ALL });
    consumer.apply(AuthLoginScore).forRoutes(
      {
        path: 'students',
        method: RequestMethod.GET,
      },
      {
        path: 'students',
        method: RequestMethod.PATCH,
      },
      { path: 'students', method: RequestMethod.DELETE },
      { path: 'students/format/:id/:name/tl', method: RequestMethod.GET },
      { path: 'students/format/:id/:name', method: RequestMethod.GET },
      { path: 'students/format', method: RequestMethod.GET },
      { path: 'students/import-csv/beet-ween', method: RequestMethod.POST },
      { path: 'students/import-csv/end', method: RequestMethod.POST },
      { path: 'students/import-csv/end_end', method: RequestMethod.POST },
      { path: 'students/search-score', method: RequestMethod.POST },
    );

    consumer.apply(AuthLogin).forRoutes(
      { path: 'students//tt-score-studnet', method: RequestMethod.GET },
      {
        path: 'students/count/tl/:exam/:time_start',
        method: RequestMethod.GET,
      }, 
      { path: 'students/count/:exam/:time_start', method: RequestMethod.GET },
      { path: 'students/schedule_pdf/:id', method: RequestMethod.POST },
      { path: 'students/schedule_pdf/tl/:id', method: RequestMethod.POST },
    );

    consumer.apply(AuthLogin).forRoutes({
      path: 'table-exam-big-block-class/(.*)',
      method: RequestMethod.ALL,
    });
    consumer.apply(AuthLogin).forRoutes({
      path: 'table-teacher-room/(.*)',
      method: RequestMethod.ALL,
    });
    consumer.apply(AuthLogin).forRoutes({
      path: 'table-big-class-exam/(.*)',
      method: RequestMethod.ALL,
    });
    consumer
      .apply(AuthLogin)
      .forRoutes({ path: 'teacher/(.*)', method: RequestMethod.ALL });

    consumer.apply(AuthLogin).forRoutes({
      path: 'teacher-mark-exam-room/(.*)',
      method: RequestMethod.ALL,
    });
    consumer
      .apply(AuthLogin)
      .forRoutes({ path: 'teacher-track/(.*)', method: RequestMethod.ALL });

    consumer.apply(AuthLogin).forRoutes({
      path: 'test-schedule-student/(.*)',
      method: RequestMethod.ALL,
    });
  }
}
