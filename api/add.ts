import { Router } from 'express'
import { upload } from '../config/multer'
import studenttask from '../models/studenttask'
const router = Router()

// @POST /api/create-student-task
router.post('/create-student-task', upload.array('files'), async (req, res) => {
    try {
        const body = req.body
        console.log(body)
        const files = req.files || [];
        const subjects = JSON.parse(body.subjects || '[]')
        const topics = JSON.parse(body.topics || '[]')
        const attachments = (files as Express.Multer.File[]).map((file: Express.Multer.File) => ({
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

        const task = new studenttask(taskData);
        await task.save();
        res.status(200).json({ message: "Student task created successfully", task })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

export default router
