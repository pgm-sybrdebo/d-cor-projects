import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Designer } from 'src/designers/entities/designer.entity';
import { Media } from 'src/media/entities/media.entity';
import { Subcontractor } from 'src/subcontractors/entities/subcontractor.entity';
import { Raw, Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { MediaService } from 'src/media/media.service';
import { Report } from 'src/reports/entities/report.entity';
import { ReportsService } from 'src/reports/reports.service';
import { DesignersService } from 'src/designers/designers.service';
import { SubcontractorsService } from 'src/subcontractors/subcontractors.service';
import { Client } from 'src/clients/entities/client.entity';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private readonly projectsRepository: Repository<Project>,
    private clientsService: ClientsService,
    private designersService: DesignersService,
    private subcontractorsService: SubcontractorsService,
    private mediaService: MediaService,
    private reportsService: ReportsService,
  ){}

  async count(name: String): Promise<number> {
    const rawData = await this.projectsRepository.query(`
    SELECT
      COUNT(DISTINCT id) AS total
    FROM
      "project"
    WHERE project.deleted_on IS NULL
    AND LOWER(project.name) LIKE LOWER('${name}%')
    `);
    return rawData[0].total;
  }
  async countActive(name: String): Promise<number> {
    const rawData = await this.projectsRepository.query(`
    SELECT
      COUNT(DISTINCT id) AS total
    FROM
      "project"
    WHERE project.deleted_on IS NULL
    AND LOWER(project.name) LIKE LOWER('${name}%')
    AND project.active = true
    `);
    return rawData[0].total;
  }

  create(createProjectInput: CreateProjectInput):Promise<Project> {
    const newProject = this.projectsRepository.create(createProjectInput);
    return this.projectsRepository.save(newProject);
  }

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  findAllWithPagination(offset: number, limit: number): Promise<Project[]> {
    return this.projectsRepository.find({
      skip: offset * limit,
      take: limit,
      order: {
        created_on: 'DESC',
      },
    });
  }

  findAllActiveWithPagination(offset: number, limit: number): Promise<Project[]> {
    return this.projectsRepository.find({
      skip: offset * limit,
      take: limit,
      where: {
        active: true,
      },
      order: {
        created_on: 'DESC',
      },
    });
  }

  // findAllProjectsByNameWithPagination(
  //   name: string,
  //   offset: number,
  //   limit: number,
  // ): Promise<Project[]> {
  //   return this.projectsRepository.find({
  //     where: {
  //       name: Raw((alias) => `LOWER(${alias}) Like LOWER('${name}%')`),
  //     },
  //     skip: offset * limit,
  //     take: limit,
  //     order: {
  //       created_on: 'DESC',
  //     },
  //   });
  // }

  async findAllProjectsByNameWithPagination(
    name: string,
    sort: string,
    offset: number,
    limit: number,
  ): Promise<Project[]> {
    const rawData = await this.projectsRepository.query(`
      SELECT
        *
      FROM
        project
      WHERE project.deleted_on IS NULL
      AND LOWER(project.name) LIKE LOWER('${name}%')
      GROUP BY project.id
      ORDER BY ${sort === "alphabetically" ? "project.name ASC" : sort === "ascending" ? "project.created_on ASC" : "project.created_on DESC" }
      OFFSET ${offset * limit}
      LIMIT ${limit}
    `);
    return rawData;
  }

  // findAllActiveProjectsByNameWithPagination(
  //   name: string,
  //   sort: string,
  //   offset: number,
  //   limit: number,
  // ): Promise<Project[]> {
  //   return this.projectsRepository.find({
  //     where: {
  //       name: Raw((alias) => `LOWER(${alias}) Like LOWER('${name}%')`),
  //       active: true,
  //     },
  //     skip: offset * limit,
  //     take: limit,
  //     order: {
  //       name: 'ASC',
  //     },
  //   });
  // }

  // async findAllActiveProjectsByNameWithPagination(
  //   name: string,
  //   offset: number,
  //   limit: number,
  // ): Promise<Project[]> {
  //   const rawData = await this.projectsRepository.query(`
  //     SELECT
  //       *,
  //       (SELECT COUNT(id) AS total
  //       FROM project 
  //       WHERE project.deleted_on IS NULL
  //       AND LOWER(project.name) LIKE LOWER('${name}%')
  //       AND project.active = true)
  //     FROM
  //       project
  //     WHERE project.deleted_on IS NULL
  //     AND LOWER(project.name) LIKE LOWER('${name}%')
  //     AND project.active = true
  //     GROUP BY project.id
  //     ORDER BY project.created_on DESC
  //     OFFSET ${offset * limit}
  //     LIMIT ${limit}
  //   `);
  //   // console.log(rawData);
  //   return rawData;
  // }


  async findAllActiveProjectsByNameWithPagination(
    name: string,
    sort: string,
    offset: number,
    limit: number,
  ): Promise<Project[]> {
    const rawData = await this.projectsRepository.query(`
      SELECT
        *
      FROM
        project
      WHERE project.deleted_on IS NULL
      AND LOWER(project.name) LIKE LOWER('${name}%')
      AND project.active = true
      GROUP BY project.id
      ORDER BY ${sort === "alphabetically" ? "project.name ASC" : sort === "ascending" ? "project.created_on ASC" : "project.created_on DESC" }
      OFFSET ${offset * limit}
      LIMIT ${limit}
    `);
    return rawData;
  }

  findAllActive(): Promise<Project[]> {
    return this.projectsRepository.find({
      where: {
        active: true,
      },
    });
  }

  findOne(id: number): Promise<Project> {
    return this.projectsRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateProjectInput: UpdateProjectInput): Promise<Project> {
    const updatedProject = await this.projectsRepository.preload({
      id: id,
      ...updateProjectInput,
    });

    return this.projectsRepository.save(updatedProject); 
  }

  async remove(id: number): Promise<Number> {
    const project = await this.projectsRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    this.projectsRepository.remove(project);
    return id;
  }


  async addDesignerToProject(projectId: number, designerId: number): Promise<Project> {
    const foundProject = await this.projectsRepository.findOne({
      where: {
        id: projectId,
      },
      relations: ['designers'],
    });
    const foundDesigner = await this.designersService.findOne(designerId);

    if (foundProject && foundDesigner) {
      foundProject.designers = foundProject.designers
        ? [...foundProject.designers, foundDesigner]
        : [foundDesigner];

      return this.projectsRepository.save(foundProject);
    } else {
      throw new Error(`Founding Project or Designer problem`);
    }
  }

  async removeDesignerFromProject(projectId: number, designerId: number): Promise<Project> {
    const foundProject = await this.projectsRepository.findOne(
      {
        where: {
          id: projectId,
        },
        relations: ['designers'],
      }
    );
    const foundDesigner = await this.designersService.findOne(designerId);

    if (foundProject && foundDesigner) {
      foundProject.designers = foundProject.designers
        ? [...foundProject.designers.filter((f) => f.id != designerId)]
        : [];

      return this.projectsRepository.save(foundProject);
    } else {
      throw new Error(`Founding project or designer problem`);
    }
  }

  async addSubcontractorToProject(projectId: number, subcontractorId: number): Promise<Project> {
    const foundProject = await this.projectsRepository.findOne({
      where: {
        id: projectId,
      },
      relations: ['subcontractors'],
    });
    const foundSubcontractor = await this.subcontractorsService.findOne(subcontractorId);

    if (foundProject && foundSubcontractor) {
      foundProject.subcontractors = foundProject.subcontractors
        ? [...foundProject.subcontractors, foundSubcontractor]
        : [foundSubcontractor];

      return this.projectsRepository.save(foundProject);
    } else {
      throw new Error(`Founding Project or Subcontractor problem`);
    }
  }

  async removeSubcontractorFromProject(projectId: number, subcontractorId: number): Promise<Project> {
    const foundProject = await this.projectsRepository.findOne(
      {
        where: {
          id: projectId,
        },
        relations: ['subcontractors'],
      }
    );
    const foundSubcontractor = await this.subcontractorsService.findOne(subcontractorId);

    if (foundProject && foundSubcontractor) {
      foundProject.subcontractors = foundProject.subcontractors
        ? [...foundProject.subcontractors.filter((f) => f.id != subcontractorId)]
        : [];

      return this.projectsRepository.save(foundProject);
    } else {
      throw new Error(`Founding project or subcontractor problem`);
    }
  }





  // resolve fields

  async getDesignersByProjectId(projectId: number): Promise<Designer[]> {
    const project = await this.projectsRepository.
      findOneOrFail({
        where: {
          id: projectId,
        },
        relations: ['designers'],
      });
      console.log(project);
    if (project.designers) return project.designers;
    return [];
  }

  async getSubcontractorsByProjectId(projectId: number): Promise<Subcontractor[]> {
    const project = await this.projectsRepository.
      findOneOrFail({
        where: {
          id: projectId,
        },
        relations: ['subcontractors'],
      });
    if (project.subcontractors) return project.subcontractors;
    return [];
  }

  getMediaByProjectId(projectId: number): Promise<Media[]> {
    return this.mediaService.findAllByProjectId(projectId);
  }

  getReportsByProjectId(projectId: number): Promise<Report[]> {
    return this.reportsService.findAllByProjectId(projectId);
  }

  getClientByClientId(clientId: number): Promise<Client> {
    return this.clientsService.findOne(clientId);
  }


}
