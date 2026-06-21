import mongoose, { Schema } from "mongoose";

const syllabusSchema = new Schema(
  {
    examType: {
      type: String,
      required: true,
      trim: true,
    },

    examDate: {
      type: Date,
      required: true,
    },

    studyHours: {
      type: String,
      required: true,
    },

    topics: [
      {
        value: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],

    chapterName: {
      type: String,
      required: true,
      trim: true,
    },

    learningObjectives: {
      type: String,
      required: true,
      trim: true,
    },

    coverage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },

    keyLearnings: {
      type: String,
      default: "",
      trim: true,
    },

    subjects: [
      {
        type: String,
        trim: true,
      },
    ],

    status: {
      type: String,
      required: true,
      enum: ["Not Started", "In Progress", "Completed"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Syllabus ||
  mongoose.model("Syllabus", syllabusSchema);