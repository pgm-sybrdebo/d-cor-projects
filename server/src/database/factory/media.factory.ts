import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Media } from 'src/media/entities/media.entity';


interface Context {
  projectId: number;
}

define(Media, (faker: typeof Faker, context: Context) => {
  const { projectId } = context;
  const m = new Media();
  m.projectId = projectId;
  m.name = faker.lorem.word();
  m.type = "jpg";
  m.source = "source";
  return m;
});
