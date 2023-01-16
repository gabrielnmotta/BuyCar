export interface TechnicalI {
   id: number;
   office: string;
   name: string;
   urlProfile: string;
   salary: number;
   projects: number;
}

export interface CustomersI {
   id: number;
   name: string;
   farms: CustomerFarmI[];
   totalProjects: number;
}
export interface CustomerFarmI {
   id: number;
   name: string;
   countyId: number;
   county: string;
   uf: string;
}