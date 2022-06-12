import { Test, TestingModule } from '@nestjs/testing';
import { SubcontractorsResolver } from './subcontractors.resolver';
import { SubcontractorsService } from './subcontractors.service';

describe('SubcontractorsResolver', () => {
  let resolver: SubcontractorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubcontractorsResolver, SubcontractorsService],
    }).compile();

    resolver = module.get<SubcontractorsResolver>(SubcontractorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
