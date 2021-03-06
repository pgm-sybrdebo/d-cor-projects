import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ReportsService } from './reports.service';
import { Report } from './entities/report.entity';
import { CreateReportInput } from './dto/create-report.input';
import { UpdateReportInput } from './dto/update-report.input';
import { ReportSection } from 'src/report-sections/entities/report-section.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Report)
export class ReportsResolver {
  constructor(private readonly reportsService: ReportsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Report)
  createReport(@Args('createReportInput') createReportInput: CreateReportInput) {
    return this.reportsService.create(createReportInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Report], { name: 'reports' })
  findAll() {
    return this.reportsService.findAll();
  }

 
  @Query(() => Report, { name: 'report' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reportsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Report)
  updateReport(@Args('updateReportInput') updateReportInput: UpdateReportInput) {
    return this.reportsService.update(updateReportInput.id, updateReportInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Report)
  removeReport(@Args('id', { type: () => Int }) id: number) {
    return this.reportsService.remove(id);
  }

  @ResolveField((returns) => [ReportSection])
  reportSections(@Parent() report: Report): Promise<ReportSection[]> {
    return this.reportsService.getReportSectionsByReportId(report.id);
  }
}
