export type TUser = {
  id: string;
  username: string;
  email: string;
  password: string;
  active: boolean;
};

export type TUpdateUser = {
  username?: string;
  email?: string;
  password?: string;
};
