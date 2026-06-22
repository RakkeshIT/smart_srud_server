"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = require("../config/multer");
const syllabutask_1 = __importDefault(require("../models/syllabutask"));
const router = (0, express_1.Router)();
// @POST /api/create-syllabus
router.post("/create-syllabus", multer_1.upload.array("files"), async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const files = req.files || [];
        const subjects = body.subjects;
        const topics = body.topics;
        const attachments = files.map((file) => ({
            name: file.originalname,
            type: file.mimetype,
            url: file.path,
            size: file.size,
        }));
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
        const syllabus = new syllabutask_1.default(syllabusData);
        await syllabus.save();
        res.status(201).json({
            status: 201,
            message: "Syllabus created successfully",
            syllabus,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
});
exports.default = router;
