export type APIResponse = {
  success: boolean;
  data: any | null;
  message: string;
};

export type RegisterUser = {
  username: string;
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  username: string;
  created_on: string;
};
