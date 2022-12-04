import { Email } from "../../entities/emails.entity";
import { Phone } from "../../entities/phones.entity";

export interface IContact {
  id: string;
  name: string;
}

export interface IContactSchema {
  name: string;
  phones?: string[];
  emails?: string[];
}

export interface IContactPatchData {
  name?: string;
  phones?: Phone[];
  emails?: Email[];
}

export interface IContactRequest {
  name: string;
  userId: string;
  phones?: string[];
  emails?: string[];
}

export interface IContactRequestPatch {
  name?: string;
  phones?: string[];
  emails?: string[];
}
