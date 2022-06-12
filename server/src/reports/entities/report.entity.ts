import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Project } from 'src/projects/entities/project.entity';
import { ReportSection } from 'src/report-sections/entities/report-section.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Report {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field(type => Int)
  projectId: number;

  @Column()
  @Field(type => Int)
  number: number;

  @Column()
  @Field()
  generalInfo: string;

  @Column()
  @Field()
  dcorprojects: string;

  @Column()
  @Field()
  pdf: string;

  @Column()
  @Field()
  startDate: Date;

  @Column()
  @Field()
  nextDate: Date;

  @CreateDateColumn()
  @Field()
  created_on: Date;

  @UpdateDateColumn()
  @Field()
  updated_on: Date;

  @DeleteDateColumn()
  @Field()
  deleted_on: Date;

  @ManyToOne(() => Project, (project) => project.reports)
  @Field((type) => Project)
  project: Project;

  @OneToMany(() => ReportSection, (reportSection) => reportSection.report)
  @Field((type) => [ReportSection])
  reportSections: ReportSection[];
}
