import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportSection } from 'src/report-sections/entities/report-section.entity';
import { ReportSectionsService } from 'src/report-sections/report-sections.service';
import { Repository } from 'typeorm';
import { CreateReportInput } from './dto/create-report.input';
import { UpdateReportInput } from './dto/update-report.input';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly reportsRepository: Repository<Report>,
    private reportSectionService: ReportSectionsService
  ){}

  create(createReportInput: CreateReportInput): Promise<Report> {
    const newReport = this.reportsRepository.create(createReportInput);
    return this.reportsRepository.save(newReport);
  }

  findAll(): Promise<Report[]> {
    return this.reportsRepository.find();
  }

  findAllByProjectId(projectId: number): Promise<Report[]> {
    return this.reportsRepository.find({
      where: {
        projectId: projectId,
      },
    });
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

  async remove(id: number): Promise<Report> {
    const report = await this.reportsRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    return this.reportsRepository.softRemove(report);
  }

  // Resolve fields


  getReportSectionsByReportId(reportId: number): Promise<ReportSection[]> {
    return this.reportSectionService.findAllByReportId(reportId);
  }
}
