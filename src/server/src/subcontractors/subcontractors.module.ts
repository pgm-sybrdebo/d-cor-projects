import { Module } from '@nestjs/common';
import { SubcontractorsService } from './subcontractors.service';
import { SubcontractorsResolver } from './subcontractors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcontractor } from './entities/subcontractor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subcontractor])],
  providers: [SubcontractorsResolver, SubcontractorsService],
  exports: [SubcontractorsService],
})
export class SubcontractorsModule {}
