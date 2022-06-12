import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DesignersService } from './designers.service';
import { Designer } from './entities/designer.entity';
import { CreateDesignerInput } from './dto/create-designer.input';
import { UpdateDesignerInput } from './dto/update-designer.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Designer)
export class DesignersResolver {
  constructor(private readonly designersService: DesignersService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Designer)
  createDesigner(@Args('createDesignerInput') createDesignerInput: CreateDesignerInput) {
    return this.designersService.create(createDesignerInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Designer], { name: 'designers' })
  findAll() {
    return this.designersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Designer, { name: 'designer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.designersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Designer)
  updateDesigner(@Args('updateDesignerInput') updateDesignerInput: UpdateDesignerInput) {
    return this.designersService.update(updateDesignerInput.id, updateDesignerInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Designer)
  removeDesigner(@Args('id', { type: () => Int }) id: number) {
    return this.designersService.remove(id);
  }
}
