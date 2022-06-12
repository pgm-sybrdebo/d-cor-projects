import { CreateDesignerInput } from './create-designer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';

@InputType()
export class UpdateDesignerInput extends PartialType(CreateDesignerInput) {
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  @Field(type => Int)
  id: number;
}
