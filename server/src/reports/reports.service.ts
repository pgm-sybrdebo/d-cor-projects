import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportInput } from './dto/create-report.input';
import { UpdateReportInput } from './dto/update-report.input';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly reportsRepository: Repository<Report>,
  ){}

  create(createReportInput: CreateReportInput): Promise<Report> {
    const newReport = this.reportsRepository.create(createReportInput);
    return this.reportsRepository.save(newReport);
  }

  findAll(): Promise<Report[]> {
    return this.reportsRepository.find();
  }

  findOne(id: number): Promise<Report> {
    return this.reportsRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateReportInput: UpdateReportInput) {
    const updatedReport = await this.reportsRepository.preload({
      id: id,
      ...updateReportInput,
    });

    return this.reportsRepository.save(updatedReport); 
  }

  async remove(id: number) {
    const report = await this.reportsRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    this.reportsRepository.remove(report);
    return id;
  }
}
