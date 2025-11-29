import { Document, Model, model, models, Schema } from "mongoose";

export interface IStudentForm extends Document {
  fullName: string;
  rollNumber: string;
  semester: string;
  email: string;
  phone: string;
  careerGoal: string;
  skills: string[];
  events: string[];
  suggestions?: string;
  contacted?: boolean;
  sourceIP?: string;
  createdAt: Date;
}

const StudentFormSchema: Schema<IStudentForm> = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
  },
  semester: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  careerGoal: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  events: {
    type: [String],
    default: [],
  },
  suggestions: {
    type: String,
  },
  contacted: {
    type: Boolean,
    default: false,
  },
  sourceIP: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default (models.StudentForm as Model<IStudentForm>) ||
  model<IStudentForm>("StudentForm", StudentFormSchema);
