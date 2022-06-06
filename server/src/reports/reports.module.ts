import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsResolver } from './reports.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { ReportSectionsModule } from 'src/report-sections/report-sections.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]),ReportSectionsModule],
  providers: [ReportsResolver, ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
