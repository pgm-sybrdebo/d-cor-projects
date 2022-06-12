import { CreateReportSectionInput } from './create-report-section.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';

@InputType()
export class UpdateReportSectionInput extends PartialType(CreateReportSectionInput) {
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  @Field(type => Int)
  id: number;
}
