import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { argsToArgsConfig } from 'graphql/type/definition';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query(() => Int, { name: 'totalProjects' })
  async totalProjects(@Args('name', { type: () => String }) name: string) {
    return this.projectsService.count(name);
  }

  @Query(() => Int, { name: 'totalActiveProjects' })
  totalActiveProjects(@Args('name', { type: () => String }) name: string) {
    return this.projectsService.countActive(name);
  }

  @Mutation(() => Project)
  createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput) {
    return this.projectsService.create(createProjectInput);
  }

  @Query(() => [Project], { name: 'projects' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Query(() => [Project], { name: 'activeProjects' })
  findAllActive() {
    return this.projectsService.findAllActive();
  }

  @Query(() => [Project], { name: 'projectsByPagination' })
  findAllWithPagination(
    @Args('offset', { type: () => Int }, new ParseIntPipe()) offset: number,
    @Args('limit', { type: () => Int }, new ParseIntPipe()) limit: number,
  ) {
    return this.projectsService.findAllWithPagination(offset, limit);
  }

  @Query(() => [Project], { name: 'activeProjectsByPagination' })
  findAllActiveWithPagination(
    @Args('offset', { type: () => Int }, new ParseIntPipe()) offset: number,
    @Args('limit', { type: () => Int }, new ParseIntPipe()) limit: number,
  ) {
    return this.projectsService.findAllActiveWithPagination(offset, limit);
  }

  @Query(() => [Project], { name: 'projectsByNameWithPagination' })
  findAllProjectsByNameWithPagination(
    @Args('name', { type: () => String }) name: string,
    @Args('sort', { type: () => String }) sort: string,
    @Args('offset', { type: () => Int }, new ParseIntPipe()) offset: number,
    @Args('limit', { type: () => Int }, new ParseIntPipe()) limit: number,
  ) {
    return this.projectsService.findAllProjectsByNameWithPagination(
      name,
      sort,
      offset,
      limit,
    );
  }

  @Query(() => [Project], { name: 'activeProjectsByNameWithPagination' })
  findAllActiveProjectsByNameWithPagination(
    @Args('name', { type: () => String }) name: string,
    @Args('sort', { type: () => String }) sort: string,
    @Args('offset', { type: () => Int }, new ParseIntPipe()) offset: number,
    @Args('limit', { type: () => Int }, new ParseIntPipe()) limit: number,
  ) {

    return this.projectsService.findAllActiveProjectsByNameWithPagination(
      name,
      sort,
      offset,
      limit,
    );
  }

  @Query(() => Project, { name: 'project' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.projectsService.findOne(id);
  }

  @Mutation(() => Project)
  updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput) {
    return this.projectsService.update(updateProjectInput.id, updateProjectInput);
  }

  @Mutation(() => Project)
  removeProject(@Args('id', { type: () => Int }) id: number) {
    return this.projectsService.remove(id);
  }
}
