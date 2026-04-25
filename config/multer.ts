import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
const CloudinaryStorage = require('multer-storage-cloudinary');
import cloudinary from './cloudinary_config';

// Configure memory storage
// You can change this to diskStorage if you want to store files locally
const storage = CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "student_tasks",
    filename: function (req: any, file: any, cb: any) {
        cb(undefined, Date.now() + "-" + file.originalname);
    }
});

export const upload = multer({ storage });