export type TUserDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userHandle: string;
  _id: string;
  photo: string;
  primaryContact: TContact;
};

export type TContact = {
  contactId: string;
  email: string;
  name: string;
  phoneNumber: string;
  relationship: string;
  _id: string;
};

export type TIncident = {
  title: string;
  location: Location;
  natureOfIncident: string;
  description: string;
  media: string[];
  links: string[];
  userId: string;
  createdAt: Date;
};

export interface Location {
  type: string;
  coordinates: string[];
}
