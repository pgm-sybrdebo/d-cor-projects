import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ReportSectionsService } from './report-sections.service';
import { ReportSection } from './entities/report-section.entity';
import { CreateReportSectionInput } from './dto/create-report-section.input';
import { UpdateReportSectionInput } from './dto/update-report-section.input';
import { Media } from 'src/media/entities/media.entity';
import { Subcontractor } from 'src/subcontractors/entities/subcontractor.entity';
import { Designer } from 'src/designers/entities/designer.entity';
import { Client } from 'src/clients/entities/client.entity';

@Resolver(() => ReportSection)
export class ReportSectionsResolver {
  constructor(private readonly reportSectionsService: ReportSectionsService) {}

  @Mutation(() => ReportSection)
  createReportSection(@Args('createReportSectionInput') createReportSectionInput: CreateReportSectionInput) {
    return this.reportSectionsService.create(createReportSectionInput);
  }

  @Query(() => [ReportSection], { name: 'reportSections' })
  findAll() {
    return this.reportSectionsService.findAll();
  }
  
  @Query(() => [ReportSection], { name: 'findAllSubcontractorsByReportId' })
  findAllSubcontractorsByReportId(@Args('reportId', { type: () => Int }) reportId: number) {
    return this.reportSectionsService.findAllSubcontractorsByReportId(reportId);
  }

  @Query(() => [ReportSection], { name: 'findAllDesignersByReportId' })
  findAllDesignersByReportId(@Args('reportId', { type: () => Int }) reportId: number) {
    return this.reportSectionsService.findAllDesignersByReportId(reportId);
  }

  @Query(() => [ReportSection], { name: 'findAllClientsByReportId' })
  findAllClientsByReportId(@Args('reportId', { type: () => Int }) reportId: number) {
    return this.reportSectionsService.findAllClientsByReportId(reportId);
  }

  @Query(() => ReportSection, { name: 'reportSection' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reportSectionsService.findOne(id);
  }

  @Mutation(() => ReportSection)
  updateReportSection(@Args('updateReportSectionInput') updateReportSectionInput: UpdateReportSectionInput) {
    return this.reportSectionsService.update(updateReportSectionInput.id, updateReportSectionInput);
  }

  @Mutation(() => ReportSection)
  removeReportSection(@Args('id', { type: () => Int }) id: number) {
    return this.reportSectionsService.remove(id);
  }

  @ResolveField((returns) => [Media])
  media(@Parent() reportSection: ReportSection): Promise<Media[]> {
    return this.reportSectionsService.getMediaByReportSectionId(reportSection.id);
  }

  @ResolveField((returns) => Subcontractor)
  subcontractor(@Parent() reportSection: ReportSection): Promise<Subcontractor> {
    return this.reportSectionsService.getSubcontractorBySubcontractorId(reportSection.subcontractorId);
  }
  @ResolveField((returns) => Designer)
  designer(@Parent() reportSection: ReportSection): Promise<Designer> {
    return this.reportSectionsService.getDesignerByDesignerId(reportSection.designerId);
  }
  @ResolveField((returns) => Client)
  client(@Parent() reportSection: ReportSection): Promise<Client> {
    return this.reportSectionsService.getClientByClientId(reportSection.clientId);
  }

}
