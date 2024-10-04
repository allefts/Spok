export enum ACTION {
  WALK = "walk",
  REST = "rest",
  EAT = "eat",
  DRINK = "drink",
}

export const toACTION = (str: string) => {
  switch (str) {
    case "walk":
      return ACTION.WALK;
    case "rest":
      return ACTION.REST;
    case "eat":
      return ACTION.EAT;
    case "drink":
      return ACTION.DRINK;
    default:
      break;
  }
};

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

export type Log = {
  id: number;
  user_id: 1;
  action: ACTION;
  timestamp: string;
};
