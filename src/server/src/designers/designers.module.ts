import { Module } from '@nestjs/common';
import { DesignersService } from './designers.service';
import { DesignersResolver } from './designers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Designer } from './entities/designer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Designer])],
  providers: [DesignersResolver, DesignersService],
  exports: [DesignersService],
})
export class DesignersModule {}
