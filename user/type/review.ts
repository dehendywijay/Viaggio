export type Review = {
  ID: string;
  user_id: string;
  wisata_id: string;
  rating: number;
  comment: string;
  CreatedAt: string;
  User?: {
    nama: string;
    email: string;
  };
};

export type ReviewsResponse = {
  data: Review[];
};
