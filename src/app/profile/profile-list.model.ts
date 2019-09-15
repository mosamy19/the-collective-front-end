import { ProfileModel } from "./profile.model";

export class ProfileListModel {
  profiles: ProfileModel[];
  currentPage: number;
  pages: number;
  count: number;
}
