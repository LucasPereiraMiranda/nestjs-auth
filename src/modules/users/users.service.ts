import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/createUsers.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async findOne(id: number) {
    return await this.usersRepository.findOne(id);
  }

  public async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  public async create(createUserDto: CreateUserDto) {
    await this.validateEmailAlreadyExists(createUserDto.email);
    const user = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return user;
  }

  private async validateEmailAlreadyExists(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      throw new HttpException('This email already exist', HttpStatus.CONFLICT);
    }
  }
}
