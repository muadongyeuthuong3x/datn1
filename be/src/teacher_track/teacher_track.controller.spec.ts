import { Test, TestingModule } from '@nestjs/testing';
import { TeacherTrackController } from './teacher_track.controller';
import { TeacherTrackService } from './teacher_track.service';

describe('TeacherTrackController', () => {
  let controller: TeacherTrackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherTrackController],
      providers: [TeacherTrackService],
    }).compile();

    controller = module.get<TeacherTrackController>(TeacherTrackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
