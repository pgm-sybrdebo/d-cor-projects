import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsPositive, IsPostalCode, IsString } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(type => Int)
  clientId: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;
  
  @IsNotEmpty()
  @IsDate()
  @Field((type) => Date)
  startDate: Date;

  @IsNotEmpty()
  @Field()
  street: string

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(type => Int)
  houseNumber: number;

  @IsNotEmpty()
  @IsPostalCode('BE')
  @Field()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  city: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(type => Boolean)
  active: boolean;
}
