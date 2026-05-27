export type User = {
  nama: string;
  email: string;
};

export type LoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
};

export type RefreshResponse = {
  data: {
    accessToken: string;
  };
};
