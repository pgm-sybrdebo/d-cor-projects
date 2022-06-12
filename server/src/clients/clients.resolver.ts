import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Client)
export class ClientsResolver {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => Int, { name: 'totalClientsByName' })
  async totalProjects(@Args('name', { type: () => String }) name: string) {
    return this.clientsService.count(name);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Client)
  createClient(@Args('createClientInput') createClientInput: CreateClientInput) {
    return this.clientsService.create(createClientInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Client], { name: 'clients' })
  findAll() {
    return this.clientsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Client], { name: 'clientsByName' })
  findAllProjectsByNameWithPagination(
    @Args('name', { type: () => String }) name: string,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.clientsService.findAllClientsByName(
      name,
      offset,
      limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Client, { name: 'client' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.clientsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Client)
  updateClient(@Args('updateClientInput') updateClientInput: UpdateClientInput) {
    return this.clientsService.update(updateClientInput.id, updateClientInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Client)
  removeClient(@Args('id', { type: () => Int }) id: number) {
    return this.clientsService.remove(id);
  }
}
