import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, IsPositive, IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateReportSectionInput {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(type => Int)
  reportId: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Field(type => Int, { nullable: true })
  clientId: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Field(type => Int, { nullable: true })
  designerId: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Field(type => Int, { nullable: true })
  subcontractorId: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  content: string;
}
