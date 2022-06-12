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

  async count(name: String): Promise<number> {
    const rawData = await this.clientsRepository.query(`
    SELECT
      COUNT(DISTINCT id) AS total
    FROM
      "client"
    WHERE client.deleted_on IS NULL
    AND LOWER(client.name) LIKE LOWER('${name}%')
    `);
    return rawData[0].total;
  }

  create(createClientInput: CreateClientInput): Promise<Client> {
    const newClient = this.clientsRepository.create(createClientInput);
    return this.clientsRepository.save(newClient);
  }

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  async findAllClientsByName(
    name: string,
    offset: number,
    limit: number,
  ): Promise<Client[]> {
    const rawData = await this.clientsRepository.query(`
      SELECT
        *
      FROM
        client
      WHERE client.deleted_on IS NULL
      AND LOWER(client.name) LIKE LOWER('${name}%')
      GROUP BY client.id
      OFFSET ${offset * limit}
      LIMIT ${limit}
    `);
    return rawData;
  }

  findOne(id: number): Promise<Client> {
    console.log(id);
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

  async remove(id: number): Promise<Client> {
    const client = await this.clientsRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    return this.clientsRepository.softRemove(client);
  }
}
