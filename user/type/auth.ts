export type User = {
  id: number;
  nama: string;
  email: string;
};

export type LoginResponse = {
  data: {
    id: number;
    email: string;
    access_token: string;
    refresh_token: string;
  };
};

export type RefreshResponse = {
  data: {
    access_token: string;
  };
};
