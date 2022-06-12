import { Test, TestingModule } from '@nestjs/testing';
import { ReportSectionsResolver } from './report-sections.resolver';
import { ReportSectionsService } from './report-sections.service';

describe('ReportSectionsResolver', () => {
  let resolver: ReportSectionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportSectionsResolver, ReportSectionsService],
    }).compile();

    resolver = module.get<ReportSectionsResolver>(ReportSectionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
