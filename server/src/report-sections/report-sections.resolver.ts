import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReportSectionsService } from './report-sections.service';
import { ReportSection } from './entities/report-section.entity';
import { CreateReportSectionInput } from './dto/create-report-section.input';
import { UpdateReportSectionInput } from './dto/update-report-section.input';

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
}
