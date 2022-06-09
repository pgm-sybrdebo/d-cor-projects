import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';
import { Media } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private readonly mediaRepository: Repository<Media>,
  ) {}

  create(createMediaInput: CreateMediaInput): Promise<Media> {
    const newMedia = this.mediaRepository.create(createMediaInput);
    return this.mediaRepository.save(newMedia);
  }

  findAll(): Promise<Media[]> {
    return this.mediaRepository.find();
  }

  findAllByProjectId(projectId: number): Promise<Media[]> {
    return this.mediaRepository.find({
      where: {
        projectId: projectId,
      },
    });
  }

  findOne(id: number): Promise<Media> {
    return this.mediaRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateMediaInput: UpdateMediaInput): Promise<Media> {
    const updatedMedia = await this.mediaRepository.preload({
      id: id,
      ...updateMediaInput,
    });

    return this.mediaRepository.save(updatedMedia); 
  }

  async remove(id: number): Promise<Media> {
    const media = await this.mediaRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    return this.mediaRepository.softRemove(media);
  }
}
