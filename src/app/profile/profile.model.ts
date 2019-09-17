import { CompanyModel } from "./company.module";
import { SuperpowerWeaknessModel } from "../common/superpower-weakness.module";

export class EmailModel {
  _id: string;
  value: string;
  isPrimary: boolean;
}
export class PhoneModel {
  _id: string;
  value: string;
  prefix: string;
  isPrimary: boolean;
}
export class NoteModel {
  _id: string;
  profile: string;
  date: Date;
  title: string;
  body: string;
}

export class ProfileModel {
  _id: string;
  name: string;
  location: string;
  profileImg: string;
  star: boolean;
  emails: EmailModel[];
  phones: PhoneModel[];
  bio: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedIn: string;
  superpowers: SuperpowerWeaknessModel[];
  weaknesses: SuperpowerWeaknessModel[];
  notes: NoteModel[];
  companies: CompanyModel[];
}
