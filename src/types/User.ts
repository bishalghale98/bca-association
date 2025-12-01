import { Document } from "mongoose";

export enum ROLE {
  ADMIN = "admin",
  USER = "user",
  SUPER_ADMIN = "super_admin",
}

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  role: ROLE;
  createdAt: Date;
  updatedAt: Date;
}

