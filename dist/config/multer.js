"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
const CloudinaryStorage = require('multer-storage-cloudinary');
const cloudinary_config_1 = __importDefault(require("./cloudinary_config"));
// Configure memory storage
// You can change this to diskStorage if you want to store files locally
const storage = CloudinaryStorage({
    cloudinary: cloudinary_config_1.default,
    folder: "student_tasks",
    filename: function (req, file, cb) {
        cb(undefined, Date.now() + "-" + file.originalname);
    }
});
exports.upload = (0, multer_1.default)({ storage });
