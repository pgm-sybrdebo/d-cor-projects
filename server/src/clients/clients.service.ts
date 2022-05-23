import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
  ){}

  create(createClientInput: CreateClientInput): Promise<Client> {
    const newClient = this.clientsRepository.create(createClientInput);
    return this.clientsRepository.save(newClient);
  }

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  findOne(id: number): Promise<Client> {
    return this.clientsRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateClientInput: UpdateClientInput): Promise<Client> {
    const updatedClient = await this.clientsRepository.preload({
      id: id,
      ...updateClientInput,
    })

    return this.clientsRepository.save(updatedClient);
  }

  async remove(id: number): Promise<Number> {
    const client = await this.clientsRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    this.clientsRepository.remove(client);
    return id;
  }


}
