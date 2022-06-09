import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportSectionInput } from './dto/create-report-section.input';
import { UpdateReportSectionInput } from './dto/update-report-section.input';
import { ReportSection } from './entities/report-section.entity';

@Injectable()
export class ReportSectionsService {
  constructor(
    @InjectRepository(ReportSection) private readonly reportSectionsRepository: Repository<ReportSection>,
  ){}

  create(createReportSectionInput: CreateReportSectionInput):Promise<ReportSection> {
    const newReportSection = this.reportSectionsRepository.create(createReportSectionInput);
    return this.reportSectionsRepository.save(newReportSection);
  }

  findAll(): Promise<ReportSection[]> {
    return this.reportSectionsRepository.find();
  }


  findAllByReportId(reportId: number): Promise<ReportSection[]> {
    return this.reportSectionsRepository.find({
      where: {
        reportId: reportId,
      },
    });
  }

  findOne(id: number): Promise<ReportSection> {
    return this.reportSectionsRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateReportSectionInput: UpdateReportSectionInput): Promise<ReportSection> {
    const updatedReportSection = await this.reportSectionsRepository.preload({
      id: id,
      ...updateReportSectionInput,
    });

    return this.reportSectionsRepository.save(updatedReportSection); 
  }

  async remove(id: number): Promise<ReportSection> {
    const reportSection = await this.reportSectionsRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    return this.reportSectionsRepository.softRemove(reportSection);
  }
}
