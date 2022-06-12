import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/clients/entities/client.entity';
import { DesignersService } from 'src/designers/designers.service';
import { Designer } from 'src/designers/entities/designer.entity';
import { Media } from 'src/media/entities/media.entity';
import { MediaService } from 'src/media/media.service';
import { Subcontractor } from 'src/subcontractors/entities/subcontractor.entity';
import { SubcontractorsService } from 'src/subcontractors/subcontractors.service';
import { Repository,   Not, IsNull, } from 'typeorm';
import { CreateReportSectionInput } from './dto/create-report-section.input';
import { UpdateReportSectionInput } from './dto/update-report-section.input';
import { ReportSection } from './entities/report-section.entity';




@Injectable()
export class ReportSectionsService {
  constructor(
    @InjectRepository(ReportSection) private readonly reportSectionsRepository: Repository<ReportSection>,
    private mediaService: MediaService,
    private subcontractorsService: SubcontractorsService,
    private designersService: DesignersService,
    private clientsService: ClientsService,
  ){}

  create(createReportSectionInput: CreateReportSectionInput):Promise<ReportSection> {
    const newReportSection = this.reportSectionsRepository.create(createReportSectionInput);
    return this.reportSectionsRepository.save(newReportSection);
  }

  findAll(): Promise<ReportSection[]> {
    return this.reportSectionsRepository.find();
  }

  findAllSubcontractorsByReportId(reportId: number): Promise<ReportSection[]> {
    return this.reportSectionsRepository.find({
      where: {
        reportId: reportId,
        subcontractorId: Not(IsNull()),
      },
      order: {
        created_on: 'ASC',
      },
    });
  }
  findAllDesignersByReportId(reportId: number): Promise<ReportSection[]> {
    return this.reportSectionsRepository.find({
      where: {
        reportId: reportId,
        designerId: Not(IsNull()),
      },
      order: {
        created_on: 'ASC',
      },
    });
  }
  findAllClientsByReportId(reportId: number): Promise<ReportSection[]> {
    return this.reportSectionsRepository.find({
      where: {
        reportId: reportId,
        clientId: Not(IsNull()),
      },
      order: {
        created_on: 'ASC',
      },
    });
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


  getMediaByReportSectionId(reportSectionId: number): Promise<Media[]> {
    return this.mediaService.findAllByReportSectionId(reportSectionId);
  }

  getSubcontractorBySubcontractorId(subcontractorId: number): Promise<Subcontractor> {
    return this.subcontractorsService.findOne(subcontractorId);
  }
  getDesignerByDesignerId(designerId: number): Promise<Designer> {
    return this.designersService.findOne(designerId);
  }
  getClientByClientId(clientId: number): Promise<Client> {
    return this.clientsService.findOne(clientId);
  }
}
