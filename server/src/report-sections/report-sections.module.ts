import { Module } from '@nestjs/common';
import { ReportSectionsService } from './report-sections.service';
import { ReportSectionsResolver } from './report-sections.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportSection } from './entities/report-section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportSection])],
  providers: [ReportSectionsResolver, ReportSectionsService]
})
export class ReportSectionsModule {}
