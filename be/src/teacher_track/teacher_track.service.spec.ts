import { Test, TestingModule } from '@nestjs/testing';
import { TeacherTrackService } from './teacher_track.service';

describe('TeacherTrackService', () => {
  let service: TeacherTrackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherTrackService],
    }).compile();

    service = module.get<TeacherTrackService>(TeacherTrackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
