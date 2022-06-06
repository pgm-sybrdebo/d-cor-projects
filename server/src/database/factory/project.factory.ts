import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Project } from 'src/projects/entities/project.entity';
import { Designer } from 'src/designers/entities/designer.entity';
import { Subcontractor } from 'src/subcontractors/entities/subcontractor.entity';

interface Context {
  id: number;
  designers: Designer[];
  subcontractors: Subcontractor[];
}

define(Project, (faker: typeof Faker, context: Context) => {
  const { id, designers, subcontractors } = context;
  const copyDesigners = designers.slice(0);
  const newDesigners = copyDesigners.splice(
    faker.random.number({ min: 0, max: copyDesigners.length - 1 }),
    faker.random.number({ min: 1, max: copyDesigners.length - 1 }),
  );
  const copySubcontractors = subcontractors.slice(0);
  const newSubcontractors = copySubcontractors.splice(
    faker.random.number({ min: 0, max: copySubcontractors.length - 1 }),
    faker.random.number({ min: 1, max: copySubcontractors.length - 1 }),
  );
  const project = new Project();
  project.clientId = id;
  project.designers = newDesigners;
  project.subcontractors = newSubcontractors;
  project.name = faker.company.companyName();
  project.startDate = faker.date.past();
  project.street = faker.address.streetName();
  project.houseNumber = faker.random.number({min: 1, max: 60});
  project.city = faker.address.city();
  project.postalCode = faker.address.zipCode();
  project.description = faker.lorem.paragraph();
  project.active = faker.random.boolean();

  return project;
});
