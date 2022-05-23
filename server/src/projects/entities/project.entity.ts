import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Dates } from 'src/mixins/date.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entities/user.entity';
import { Media } from 'src/media/entities/media.entity';
import { Report } from 'src/reports/entities/report.entity';
import { Designer } from 'src/designers/entities/designer.entity';
import { Subcontractor } from 'src/subcontractors/entities/subcontractor.entity';

@Entity()
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field(type => Int)
  clientId: number;

  @Column()
  @Field()
  name: string;

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
  country: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field(type => Boolean)
  active: boolean;

  // @Column(() => Dates)
  // date: Dates;

  @CreateDateColumn()
  @Field()
  created_on: Date;

  @UpdateDateColumn()
  @Field()
  updated_on: Date;

  @DeleteDateColumn()
  @Field()
  deleted_on: Date;

  @ManyToOne(() => Client, (client) => client.projects)
  @Field((type) => Client)
  client: Client;

  // @ManyToOne(() => User, (user) => user.projects)
  // @Field((type) => User)
  // user: User;

  @OneToMany(() => Media, (media) => media.project) 
  @Field((type) => [Media])
  media: Media[];

  @OneToMany(() => Report, (report) => report.project)
  @Field((type) => [Report])
  reports: Report[];

  @ManyToMany(() => Designer, (designer) => designer.projects, {cascade: true})
  @Field((type) => [Designer])
  @JoinTable({
    name: 'project_designer',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'designer_id',
      referencedColumnName: 'id',
    },
  })
  designers: Designer[];

  @ManyToMany(() => Subcontractor, (subcontractor) => subcontractor.projects, {cascade: true})
  @Field((type) => [Subcontractor])
  @JoinTable({
    name: 'project_subcontractor',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'subcontractor_id',
      referencedColumnName: 'id',
    },
  })
  subcontractors: Subcontractor[];


}
