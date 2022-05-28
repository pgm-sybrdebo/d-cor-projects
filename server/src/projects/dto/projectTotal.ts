import { ObjectType, Field } from '@nestjs/graphql';
import { Project } from '../entities/project.entity';
@ObjectType()
export class ProjectTotal {
  @Field()
  projects: Project[];

  @Field()
  total: number;
}