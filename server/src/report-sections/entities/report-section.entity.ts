import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Client } from 'src/clients/entities/client.entity';
import { Designer } from 'src/designers/entities/designer.entity';
import { Media } from 'src/media/entities/media.entity';
import { Report } from 'src/reports/entities/report.entity';
import { Subcontractor } from 'src/subcontractors/entities/subcontractor.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ReportSection {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field(type => Int)
  reportId: number;

  @Column({nullable: true})
  @Field(type => Int, {nullable: true})
  clientId: number;

  @Column({nullable: true})
  @Field(type => Int, {nullable: true})
  designerId: number;

  @Column({nullable: true})
  @Field(type => Int, {nullable: true})
  subcontractorId: number;

  @Column()
  @Field()
  content: string;

  @CreateDateColumn()
  @Field()
  created_on: Date;

  @UpdateDateColumn()
  @Field()
  updated_on: Date;

  @DeleteDateColumn()
  @Field()
  deleted_on: Date;

  @ManyToOne(() => Client, (client) => client.reportSections)
  @Field((type) => Client)
  client: Client;

  @ManyToOne(() => Report, (report) => report.reportSections)
  @Field((type) => Report)
  report: Report;

  @ManyToOne(() => Designer, (designer) => designer.reportSections)
  @Field((type) => Designer)
  designer: Designer;

  @ManyToOne(() => Subcontractor, (subcontractor) => subcontractor.reportSections)
  @Field((type) => Subcontractor)
  subcontractor: Subcontractor;

  @OneToMany(() => Media, (media) => media.reportSection)
  @Field((type) => [Media])
  media: Media[];

}
