import { ObjectType, Field, Int, DateScalarMode } from '@nestjs/graphql';
import { Dates } from 'src/mixins/date.entity';
import { Project } from 'src/projects/entities/project.entity';
import { ReportSection } from 'src/report-sections/entities/report-section.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity()
@ObjectType()
export class Client {

  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  gsm: string;

  @Column()
  @Field()
  street: string

  @Column()
  @Field(type => Int)
  houseNumber: number;

  @Column()
  @Field()
  postalCode: string;

  @Column()
  @Field()
  city: string;

  @Column()
  @Field()
  country: string;

  @Column()
  @Field()
  vatNumber: string;

  @Column()
  @Field()
  accountNumber: string;

  @CreateDateColumn()
  @Field()
  created_on: Date;

  @UpdateDateColumn()
  @Field()
  updated_on: Date;

  @DeleteDateColumn()
  @Field()
  deleted_on: Date;

  @OneToMany(() => Project, (project) => project.client)
  @Field((type) => [Project])
  projects: Project[];

  @OneToMany(() => ReportSection, (reportSection) => reportSection.client)
  @Field((type) => [ReportSection])
  reportSections: ReportSection[];
  
}
