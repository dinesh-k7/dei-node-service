export interface IQuoteModel {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  companySize: string;
  position?: string;
  websiteUrl: string;
  companyName: string;
  monthlyCost?: number;
}

export interface IBrandingQuoteModel {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  position?: string;
  companyName: string;
  slogan: string;
  aboutCompany: string;
  targetAudience: string;
  comment?: string;
  industry?: any;
  brands?: string;
  keywords?: string;
  colorPicker?: string;
}

export interface IEnterpriseServiceModel {
  name: string;
  email: string;
  phone: string;
  companySize?: string;
  position?: string;
  websiteUrl: string;
  companyName: string;
  addressline1?: string;
  suite?: string;
  industry: string;
  zipcode?: string;
  numberofseats?: string;
  numberoftvs?: string;
  services?: string[];
}

export interface ISDWANServiceModel {
  name: string;
  email: string;
  phone: string;
  companySize?: string;
  position?: string;
  websiteUrl: string;
  companyName: string;
  primary: string;
  secondary: string;
  sitetype: string;
  noofsites?: string;
  industry: string;
  services?: string[];
}

export interface IWdQuoteModel {
  name: string;
  lastname: string;
  isContent?: boolean;
  email: string;
  phone: string;
  position: string;
  industry?: string;
  companyName: string;
  targetAudience: string;
  aboutCompany: string;
  comment?: string;
  keywords?: string[];
  colorPicker?: string;
  isSelling?: boolean;
  isSEO?: boolean;
}

export interface IReconnectQuoteModel {
  name: string;
  email: string;
  phone: string;
  beliefs?: string[];
  additional_beliefs?: string[];
  qualityOfLife?: string;
}
