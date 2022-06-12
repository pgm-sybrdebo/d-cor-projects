import { Module } from '@nestjs/common';
import { ReportSectionsService } from './report-sections.service';
import { ReportSectionsResolver } from './report-sections.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportSection } from './entities/report-section.entity';
import { MediaModule } from 'src/media/media.module';
import { SubcontractorsModule } from 'src/subcontractors/subcontractors.module';
import { ClientsModule } from 'src/clients/clients.module';
import { DesignersModule } from 'src/designers/designers.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReportSection]), MediaModule, SubcontractorsModule, ClientsModule, DesignersModule],
  providers: [ReportSectionsResolver, ReportSectionsService],
  exports: [ReportSectionsService],
})
export class ReportSectionsModule {}
