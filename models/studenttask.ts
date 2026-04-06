import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
    name: String,
    type: String,
    size: Number,
    url: String
});

const studentTaskSchema = new mongoose.Schema(
    {
        studentName: {
            type: String,
            required: true,
            trim: true
        },

        class: {
            type: String,
            required: true
        },

        subjects: [
            {
                type: String
            }
        ],

        taskName: {
            type: String,
            required: true
        },

        taskDescription: {
            type: String
        },

        dueDate: {
            type: Date
        },

        estimatedHours: {
            type: String // or Number (your choice)
        },

        status: {
            type: String,
            enum: [
                'Not Started',
                'In Progress',
                'On Hold',
                'Completed',
                'Cancelled',
            ],
            default: 'Not Started'
        },

        priority: {
            type: String,
            enum: ['Low Priority', 'Medium Priority', 'High Priority', 'Critical'],
            default: 'Medium Priority'
        },

        notes: {
            type: String
        },

        topics: [
            {
                type: String
            }
        ],

        attachments: [attachmentSchema],
        draft: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('StudentTask', studentTaskSchema);