import { CreateReportInput } from './create-report.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';

@InputType()
export class UpdateReportInput extends PartialType(CreateReportInput) {
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  @Field(type => Int)
  id: number;
}
