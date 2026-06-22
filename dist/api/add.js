"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = require("../config/multer");
const studenttask_1 = __importDefault(require("../models/studenttask"));
const router = (0, express_1.Router)();
// @POST /api/create-student-task
router.post('/create-student-task', multer_1.upload.array('files'), async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const files = req.files || [];
        const subjects = JSON.parse(body.subjects || '[]');
        const topics = JSON.parse(body.topics || '[]');
        const attachments = files.map((file) => ({
            name: file.originalname,
            type: file.mimetype,
            url: file.path,
            size: file.size,
        }));
        const taskData = {
            studentName: body.studentName,
            class: body.class,
            subjects,
            taskName: body.taskName,
            taskDescription: body.taskDescription,
            dueDate: body.dueDate,
            estimatedHours: body.estimatedHours,
            status: body.status,
            priority: body.priority,
            notes: body.notes,
            topics,
            attachments
        };
        const task = new studenttask_1.default(taskData);
        await task.save();
        res.status(200).json({ status: 200, message: "Student task created successfully", task });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
});
// @POST /api/draft-student-task
router.post('/draft-student-task', multer_1.upload.array('files'), async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const files = req.files || [];
        const subjects = JSON.parse(body.subjects || '[]');
        const topics = JSON.parse(body.topics || '[]');
        const attachments = files.map((file) => ({
            name: file.originalname,
            type: file.mimetype,
            url: file.path,
            size: file.size,
        }));
        const taskData = {
            studentName: body.studentName,
            class: body.class,
            subjects,
            taskName: body.taskName,
            taskDescription: body.taskDescription,
            dueDate: body.dueDate,
            estimatedHours: body.estimatedHours,
            status: body.status,
            priority: body.priority,
            notes: body.notes,
            topics,
            attachments,
            draft: true
        };
        const task = new studenttask_1.default(taskData);
        await task.save();
        res.status(200).json({ status: 200, message: "Student task created successfully and saved in draft", task });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
});
exports.default = router;
