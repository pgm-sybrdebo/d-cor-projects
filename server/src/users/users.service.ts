import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneOrFail({
      where: {
        email: email,
      },
    });
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    let updatedUser;
    if (updateUserInput.password) {
      const hashPassword = await bcrypt.hash(updateUserInput.password, 10);
      updatedUser = await this.usersRepository.preload({
        id: id,
        ...updateUserInput,
        password: hashPassword,
      });
    } else {
      updatedUser = await this.usersRepository.preload({
        id: id,
        ...updateUserInput,
      });
    }
    return this.usersRepository.save(updatedUser);

  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    this.usersRepository.remove(user);
  }
}
