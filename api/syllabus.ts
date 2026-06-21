import { Router } from "express";
import { upload } from "../config/multer";
import Syllabus from "../models/syllabutask";

const router = Router();

// @POST /api/create-syllabus
router.post(
  "/create-syllabus",
  upload.array("files"),
  async (req, res) => {
    try {
      const body = req.body;
      console.log(body);

      const files = req.files || [];

      const subjects = body.subjects ;
      const topics = body.topics;

      const attachments = (files as Express.Multer.File[]).map(
        (file: Express.Multer.File) => ({
          name: file.originalname,
          type: file.mimetype,
          url: file.path,
          size: file.size,
        })
      );

      const syllabusData = {
        examType: body.examType,
        examDate: body.examDate,
        studyHours: body.studyHours,
        topics,
        chapterName: body.chapterName,
        learningObjectives: body.learningObjectives,
        coverage: Number(body.coverage),
        confidence: Number(body.confidence),
        keyLearnings: body.keyLearnings,
        subjects,
        status: body.status,
        attachments,
      };

      const syllabus = new Syllabus(syllabusData);

      await syllabus.save();

      res.status(201).json({
        status: 201,
        message: "Syllabus created successfully",
        syllabus,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
);

export default router;