export class SuperpowerModel {
  _id: string;
  name: string;
}
export class WeaknessModel {
  _id: string;
  name: string;
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
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  country: string;
  profileImg: string;
  primaryEmail: string;
  email: string;
  primaryPhone: string;
  phone: string;
  bio: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedIn: string;
  superpowers: SuperpowerModel[];
  weaknesses: WeaknessModel[];
  notes: NoteModel[];
}
