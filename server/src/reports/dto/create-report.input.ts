import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, IsPositive, IsString, IsDate } from 'class-validator';

@InputType()
export class CreateReportInput {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(type => Int)
  projectId: number;

  // @IsNotEmpty()
  // @IsInt()
  // @IsPositive()
  // @Field(type => Int)
  // number: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  generalInfo: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  pdf: string;

  @IsNotEmpty()
  @IsDate()
  @Field((type) => Date)
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Field((type) => Date)
  nextDate: Date;
}
