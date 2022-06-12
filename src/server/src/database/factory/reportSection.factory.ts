import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { ReportSection } from 'src/report-sections/entities/report-section.entity';


interface Context {
  reportId: number;
  clientId?: number;
}

define(ReportSection, (faker: typeof Faker, context: Context) => {
  const randomNumber = Faker.random.number({ min: 1, max: 2 });
  const { reportId, clientId } = context;
  const reportSection = new ReportSection();
  reportSection.reportId = reportId;
  if(clientId) {
    reportSection.clientId = clientId;
  } else {
    if (randomNumber === 1) {
      reportSection.designerId = Faker.random.number({ min: 1, max: 5 });
    }
    if (randomNumber === 2) {
      reportSection.subcontractorId = Faker.random.number({ min: 1, max: 30 });
    }
  }

 
  reportSection.content = faker.lorem.paragraph();
  return reportSection;
});
