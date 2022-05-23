import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { ReportSection } from 'src/report-sections/entities/report-section.entity';


interface Context {
  reportId: number;
  clientId: number;
}

define(ReportSection, (faker: typeof Faker, context: Context) => {
  const randomNumber = Faker.random.number({ min: 1, max: 3 });
  const { reportId, clientId } = context;
  const reportSection = new ReportSection();
  reportSection.reportId = reportId;
  if (randomNumber === 1) {
    reportSection.clientId = clientId;
  }
  if (randomNumber === 2) {
    reportSection.designerId = Faker.random.number({ min: 1, max: 10 });
  }
  if (randomNumber === 3) {
    reportSection.subcontractorId = Faker.random.number({ min: 1, max: 5 });
  }
  reportSection.content = faker.lorem.paragraph();
  return reportSection;
});
