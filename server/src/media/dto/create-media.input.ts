import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateMediaInput {

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(type => Int)
  projectId: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Field(type => Int, {nullable: true})
  reportSectionId: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  type: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  source: string;
}
