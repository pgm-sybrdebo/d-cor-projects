import { CreateProjectInput } from './create-project.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  @Field(type => Int)
  id: number;
}
