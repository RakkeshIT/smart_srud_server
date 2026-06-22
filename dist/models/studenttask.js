"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const attachmentSchema = new mongoose_1.default.Schema({
    name: String,
    type: String,
    size: Number,
    url: String
});
const studentTaskSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('StudentTask', studentTaskSchema);
