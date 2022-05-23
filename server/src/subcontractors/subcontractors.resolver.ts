import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubcontractorsService } from './subcontractors.service';
import { Subcontractor } from './entities/subcontractor.entity';
import { CreateSubcontractorInput } from './dto/create-subcontractor.input';
import { UpdateSubcontractorInput } from './dto/update-subcontractor.input';

@Resolver(() => Subcontractor)
export class SubcontractorsResolver {
  constructor(private readonly subcontractorsService: SubcontractorsService) {}

  @Mutation(() => Subcontractor)
  createSubcontractor(@Args('createSubcontractorInput') createSubcontractorInput: CreateSubcontractorInput) {
    return this.subcontractorsService.create(createSubcontractorInput);
  }

  @Query(() => [Subcontractor], { name: 'subcontractors' })
  findAll() {
    return this.subcontractorsService.findAll();
  }

  @Query(() => Subcontractor, { name: 'subcontractor' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subcontractorsService.findOne(id);
  }

  @Mutation(() => Subcontractor)
  updateSubcontractor(@Args('updateSubcontractorInput') updateSubcontractorInput: UpdateSubcontractorInput) {
    return this.subcontractorsService.update(updateSubcontractorInput.id, updateSubcontractorInput);
  }

  @Mutation(() => Subcontractor)
  removeSubcontractor(@Args('id', { type: () => Int }) id: number) {
    return this.subcontractorsService.remove(id);
  }
}
