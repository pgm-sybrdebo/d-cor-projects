import { Test, TestingModule } from '@nestjs/testing';
import { ReportSectionsService } from './report-sections.service';

describe('ReportSectionsService', () => {
  let service: ReportSectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportSectionsService],
    }).compile();

    service = module.get<ReportSectionsService>(ReportSectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
