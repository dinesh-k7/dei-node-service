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
