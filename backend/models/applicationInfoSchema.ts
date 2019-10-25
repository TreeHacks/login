import mongoose from "mongoose";
import { Schema } from "mongoose";

const applicationInfoSchema: Schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  phone: String,
  dob: String,
  gender: String,
  race: {type: [String], default: undefined},
  university: String,
  graduation_year: String,
  level_of_study: String,
  major: String,
  skill_level: Number,
  hackathon_experience: Number,
  resume: String,
  accept_terms: Boolean,
  accept_share: Boolean,
  q3: String,
  q4: String,
  // Fields only used in 2019:
  q1_goodfit: String,
  q2_experience: String,
  // Fields only used in 2020:
  q1: String,
  q2: String,
  q5: String,
  q_team_matching_1: String,
  q_team_matching_2: String
}, { _id : false });

export default applicationInfoSchema;