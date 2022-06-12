import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Project } from 'src/projects/entities/project.entity';
import { ReportSection } from 'src/report-sections/entities/report-section.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Media {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field(type => Int)
  projectId: number;

  @Column({nullable: true})
  @Field(type => Int, {nullable: true})
  reportSectionId: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  source: string;

  @CreateDateColumn()
  @Field()
  created_on: Date;

  @UpdateDateColumn()
  @Field()
  updated_on: Date;

  @DeleteDateColumn()
  @Field()
  deleted_on: Date;

  @ManyToOne(() => Project, (project) => project.media)
  @Field((type) => Project)
  project: Project;

  @ManyToOne(() => ReportSection, (reportSection) => reportSection.media)
  @Field((type) => ReportSection)
  reportSection: ReportSection;
}
