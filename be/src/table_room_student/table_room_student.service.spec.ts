import { Test, TestingModule } from '@nestjs/testing';
import { TableRoomStudentService } from './table_room_student.service';

describe('TableRoomStudentService', () => {
  let service: TableRoomStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableRoomStudentService],
    }).compile();

    service = module.get<TableRoomStudentService>(TableRoomStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
