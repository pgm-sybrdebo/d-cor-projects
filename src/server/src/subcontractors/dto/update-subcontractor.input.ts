import { CreateSubcontractorInput } from './create-subcontractor.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';

@InputType()
export class UpdateSubcontractorInput extends PartialType(CreateSubcontractorInput) {
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  @Field(type => Int)
  id: number;
}
