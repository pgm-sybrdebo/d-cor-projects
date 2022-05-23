import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDesignerInput } from './dto/create-designer.input';
import { UpdateDesignerInput } from './dto/update-designer.input';
import { Designer } from './entities/designer.entity';

@Injectable()
export class DesignersService {
  constructor(
    @InjectRepository(Designer) private readonly designerRepository: Repository<Designer>,
  ){}

  create(createDesignerInput: CreateDesignerInput): Promise<Designer> {
    const newDesigner = this.designerRepository.create(createDesignerInput);
    return this.designerRepository.save(newDesigner);
  }

  findAll(): Promise<Designer[]> {
    return this.designerRepository.find();
  }

  findOne(id: number): Promise<Designer> {
    return this.designerRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateDesignerInput: UpdateDesignerInput): Promise<Designer> {
    const updatedDesigner = await this.designerRepository.preload({
      id: id,
      ...updateDesignerInput,
    });

    return this.designerRepository.save(updatedDesigner); 
  }

  async remove(id: number): Promise<Number> {
    const designer = await this.designerRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    this.designerRepository.remove(designer);
    return id;
  }
}
