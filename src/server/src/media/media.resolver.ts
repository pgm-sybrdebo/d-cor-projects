import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Media)
  createMedia(@Args('createMediaInput') createMediaInput: CreateMediaInput) {
    return this.mediaService.create(createMediaInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Media], { name: 'media' })
  findAll() {
    return this.mediaService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Media, { name: 'media' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.mediaService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Media)
  updateMedia(@Args('updateMediaInput') updateMediaInput: UpdateMediaInput) {
    return this.mediaService.update(updateMediaInput.id, updateMediaInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Media)
  removeMedia(@Args('id', { type: () => Int }) id: number) {
    return this.mediaService.remove(id);
  }
}
