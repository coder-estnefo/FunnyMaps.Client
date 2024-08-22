export interface ErrorModel {
  title: string;
  status: number;
  detail: string;
  errors?: string[];
}
