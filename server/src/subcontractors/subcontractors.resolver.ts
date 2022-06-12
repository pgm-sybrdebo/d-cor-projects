import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubcontractorsService } from './subcontractors.service';
import { Subcontractor } from './entities/subcontractor.entity';
import { CreateSubcontractorInput } from './dto/create-subcontractor.input';
import { UpdateSubcontractorInput } from './dto/update-subcontractor.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Subcontractor)
export class SubcontractorsResolver {
  constructor(private readonly subcontractorsService: SubcontractorsService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => Int, { name: 'totalSubcontractorsByCompanyName' })
  async totalSubcontractors(
    @Args('companyName', { type: () => String }) companyName: string,
    @Args('func', { type: () => String }) func: string,
  ) {
    return this.subcontractorsService.count(companyName, func);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Subcontractor)
  createSubcontractor(@Args('createSubcontractorInput') createSubcontractorInput: CreateSubcontractorInput) {
    return this.subcontractorsService.create(createSubcontractorInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Subcontractor], { name: 'subcontractors' })
  findAll() {
    return this.subcontractorsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Subcontractor], { name: 'subcontractorsByCompanyName' })
  findAllProjectsByNameWithPagination(
    @Args('companyName', { type: () => String }) companyName: string,
    @Args('func', { type: () => String }) func: string,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.subcontractorsService.findAllSubcontractorsByCompanyName(
      companyName,
      func,
      offset,
      limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Subcontractor, { name: 'subcontractor' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subcontractorsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Subcontractor)
  updateSubcontractor(@Args('updateSubcontractorInput') updateSubcontractorInput: UpdateSubcontractorInput) {
    return this.subcontractorsService.update(updateSubcontractorInput.id, updateSubcontractorInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Subcontractor)
  removeSubcontractor(@Args('id', { type: () => Int }) id: number) {
    return this.subcontractorsService.remove(id);
  }
}
