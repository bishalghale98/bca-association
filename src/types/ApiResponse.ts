export type ApiResponse = {
  success: boolean;
  message: string;
  data?: any;
  id?: string;
  error?: any;
  meta?: Meta;
};

type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
