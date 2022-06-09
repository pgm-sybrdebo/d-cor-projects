import { GridColDef } from "@mui/x-data-grid";
export interface ProjectCardProp {
  id: number;
  name: string;
  city: string;
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

export interface TableProps {
  columns: GridColDef[]
  data: any
  onCellClick?: any
  total?: number
  page?: any
  setPage?: any
}

export interface ProjectProps {
  project: Project;
}

export interface Project {
  id: number;
  name: string;
  active: boolean;
  description: string;
  startDate: EpochTimeStamp;
  street: string;
  houseNumber: number;
  postalCode: string;
  city: string;
  client: Client;
  designers: Designer[];
  subcontractors: Subcontractor[];
  media: Media[];
  reports: Report[];
}

export interface Client {
  name: string;
}

export interface Designer {
  companyName: string;
  firstName: string;
  lastName: string;
  gender: number;
}

export interface Subcontractor {
  companyName: string;
  firstName: string;
  lastName: string;
  gsm: string;
  email: string;
  function: string;
}

export interface Media {
  id: number;
  name: string;
  source: string;
  type: string;
}

export interface Report {
  created_on: EpochTimeStamp;
  pdf: string;
}

export interface UploadImageCard {
  filename: string;
  type: string;
}
