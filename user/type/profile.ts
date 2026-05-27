import { User } from "./auth";
import { Review } from "./review";

export type UserProfile = User & {
  Reviews: Review[];
};

export type ProfileResponse = {
  data: UserProfile;
};
