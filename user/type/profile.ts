export type ReviewByUser = {
  id: number;
  rating: number;
  comment: string;
  wisata: {
    id: number;
    nama: string;
  };
};

export type UserProfile = {
  user: {
    id: number;
    nama: string;
  };
  reviews: ReviewByUser[];
};

export type ProfileResponse = {
  data: UserProfile;
};
