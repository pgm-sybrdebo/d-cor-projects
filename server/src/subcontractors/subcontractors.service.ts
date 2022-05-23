import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { CreateSubcontractorInput } from './dto/create-subcontractor.input';
import { UpdateSubcontractorInput } from './dto/update-subcontractor.input';
import { Subcontractor } from './entities/subcontractor.entity';

@Injectable()
export class SubcontractorsService {
  constructor(
    @InjectRepository(Subcontractor) private readonly subcontractorsRepository: Repository<Subcontractor>,
  ){}

  create(createSubcontractorInput: CreateSubcontractorInput):Promise<Subcontractor> {
    const newSubcontractor = this.subcontractorsRepository.create(createSubcontractorInput);
    return this.subcontractorsRepository.save(newSubcontractor);
  }

  findAll(): Promise<Subcontractor[]> {
    return this.subcontractorsRepository.find();
  }

  findOne(id: number): Promise<Subcontractor> {
    return this.subcontractorsRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateSubcontractorInput: UpdateSubcontractorInput): Promise<Subcontractor> {
    const updatedSubcontractor = await this.subcontractorsRepository.preload({
      id: id,
      ...updateSubcontractorInput,
    });

    return this.subcontractorsRepository.save(updatedSubcontractor); 
  }

  async remove(id: number): Promise<Number> {
    const subcontractor = await this.subcontractorsRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    this.subcontractorsRepository.remove(subcontractor);
    return id;
  }
}
