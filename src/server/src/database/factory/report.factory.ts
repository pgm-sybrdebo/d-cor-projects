import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Report } from 'src/reports/entities/report.entity';

interface Context {
  projectId: number;
  name: string;
}

let number = 1;

define(Report, (faker: typeof Faker, context: Context) => {
  const { projectId, name } = context;
  const report = new Report();
  report.projectId = projectId;
  report.number = number;
  report.generalInfo = faker.lorem.paragraph();
  report.dcorprojects = faker.lorem.paragraph();
  report.pdf = `${name}-${number}.pdf`;
  report.startDate = faker.date.between('2021-01-01', '2021-12-31');
  report.nextDate = faker.date.between('2022-01-01', '2022-12-31');
  number++;
  return report;
});
