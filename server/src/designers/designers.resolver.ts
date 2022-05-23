import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DesignersService } from './designers.service';
import { Designer } from './entities/designer.entity';
import { CreateDesignerInput } from './dto/create-designer.input';
import { UpdateDesignerInput } from './dto/update-designer.input';

@Resolver(() => Designer)
export class DesignersResolver {
  constructor(private readonly designersService: DesignersService) {}

  @Mutation(() => Designer)
  createDesigner(@Args('createDesignerInput') createDesignerInput: CreateDesignerInput) {
    return this.designersService.create(createDesignerInput);
  }

  @Query(() => [Designer], { name: 'designers' })
  findAll() {
    return this.designersService.findAll();
  }

  @Query(() => Designer, { name: 'designer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.designersService.findOne(id);
  }

  @Mutation(() => Designer)
  updateDesigner(@Args('updateDesignerInput') updateDesignerInput: UpdateDesignerInput) {
    return this.designersService.update(updateDesignerInput.id, updateDesignerInput);
  }

  @Mutation(() => Designer)
  removeDesigner(@Args('id', { type: () => Int }) id: number) {
    return this.designersService.remove(id);
  }
}
