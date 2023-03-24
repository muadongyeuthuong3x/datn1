import { Test, TestingModule } from '@nestjs/testing';
import { TableRoomStudentController } from './table_room_student.controller';
import { TableRoomStudentService } from './table_room_student.service';

describe('TableRoomStudentController', () => {
  let controller: TableRoomStudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableRoomStudentController],
      providers: [TableRoomStudentService],
    }).compile();

    controller = module.get<TableRoomStudentController>(TableRoomStudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
