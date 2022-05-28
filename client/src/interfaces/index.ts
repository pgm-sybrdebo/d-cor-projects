export interface ProjectCardProp {
  id: number;
  name: string;
  active: boolean;
  search: string;
  sort: string;
  offset: number;
  limit: number;
}

export interface ProjectsOverview {
  projectsByNameWithPagination: ProjectOverview[];
}

export interface ActiveProjectsOverview {
  activeProjectsByNameWithPagination: ProjectOverview[];
}

export interface ProjectOverview {
  id: number;
  name: string;
  description: string;
  clientId: number;
  street: string;
  houseNumber: number;
  postalCode: string;
  city: string;
  country: string;
  active: boolean;
}