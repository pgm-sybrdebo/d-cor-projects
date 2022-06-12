import { ObjectType, Field, Int } from '@nestjs/graphql';
import { type } from 'os';
import { Project } from 'src/projects/entities/project.entity';
import { ReportSection } from 'src/report-sections/entities/report-section.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Subcontractor {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  companyName: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field(type => Int)
  gender: number;

  @Column()
  @Field()
  function: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  gsm: string;

  @Column()
  @Field()
  street: string;

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

  @ManyToMany(() => Project, (project) => project.subcontractors)
  @Field(type => [Project])
  projects: Project[];

  @OneToMany(() => ReportSection, (reportSection) => reportSection.subcontractor)
  @Field(type => [ReportSection])
  reportSections: ReportSection[];
}

