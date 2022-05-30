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

  async count(companyName: String, func: String): Promise<number> {
    const rawData = await this.subcontractorsRepository.query(`
    SELECT
      COUNT(DISTINCT id) AS total
    FROM
      "subcontractor"
    WHERE subcontractor.deleted_on IS NULL
    AND LOWER(subcontractor."companyName") LIKE LOWER('${companyName}%')
    AND LOWER(subcontractor."function") LIKE LOWER('${func}%')
    `);
    return rawData[0].total;
  }

  create(createSubcontractorInput: CreateSubcontractorInput):Promise<Subcontractor> {
    const newSubcontractor = this.subcontractorsRepository.create(createSubcontractorInput);
    return this.subcontractorsRepository.save(newSubcontractor);
  }

  findAll(): Promise<Subcontractor[]> {
    return this.subcontractorsRepository.find();
  }

  async findAllSubcontractorsByCompanyName(
    companyName: string,
    func: string,
    offset: number,
    limit: number,
  ): Promise<Subcontractor[]> {
    const rawData = await this.subcontractorsRepository.query(`
      SELECT
        *
      FROM
        subcontractor
      WHERE subcontractor.deleted_on IS NULL
      AND LOWER(subcontractor."companyName") LIKE LOWER('${companyName}%')
      AND LOWER(subcontractor."function") LIKE LOWER('${func}%')
      GROUP BY subcontractor.id
      OFFSET ${offset * limit}
      LIMIT ${limit}
    `);
    return rawData;
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

  async remove(id: number): Promise<Subcontractor> {
    const subcontractor = await this.subcontractorsRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    return this.subcontractorsRepository.softRemove(subcontractor);
  }
}
