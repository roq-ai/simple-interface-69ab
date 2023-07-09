import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface DataInterface {
  id?: string;
  soil_moisture: number;
  light_level: number;
  relative_humidity: number;
  temperature: number;
  organization_id: string;
  date: any;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface DataGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
}
