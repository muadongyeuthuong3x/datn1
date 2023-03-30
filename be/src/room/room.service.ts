import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) { }



  create(createRoomDto: CreateRoomDto) {
    const createRoom = new Room();
    createRoom.name = createRoomDto.name;
    createRoom.form_room = createRoomDto.form_room;
    return this.roomRepository.save(createRoom);
  }

  findAll() {
    return this.roomRepository.find();
  }


  findOneRoom(name: string) {
    return this.roomRepository.findOneBy({ name: name });
  }


  async findSearchRoom(name: string) {
    const data = await this.roomRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
    return data;
  }

  findOne(id_room: number) {
    return this.roomRepository.findOneBy({id : id_room});
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const { name, form_room } = updateRoomDto;
    return await this.roomRepository.update(id, { name, form_room });
  }

  async remove(id: number) {
    try {
      const dataAll = await this.roomRepository.delete(id);
      return dataAll;
    } catch (error) {
      throw new BadGatewayException({
        status: "error",
        message: "Server error "
      });
    }
  }

  async findRoomExam( array : number[]) {
    const data =  await this.roomRepository.createQueryBuilder('room')
    .where('room.id <> ALL(:idarray) ' , { idarray: array })
    .getMany();
    return data;
  }
}
