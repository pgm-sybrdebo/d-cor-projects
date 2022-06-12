import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { DesignersModule } from 'src/designers/designers.module';
import { SubcontractorsModule } from 'src/subcontractors/subcontractors.module';
import { MediaModule } from 'src/media/media.module';
import { ReportsModule } from 'src/reports/reports.module';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]), 
    ClientsModule,
    DesignersModule, 
    SubcontractorsModule, 
    MediaModule,
    ReportsModule
  ],
  providers: [ProjectsResolver, ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
