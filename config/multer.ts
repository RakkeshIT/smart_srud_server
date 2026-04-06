import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary_config';
// Configure memory storage
// You can change this to diskStorage if you want to store files locally
const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
        return {
            folder: "student_tasks",
            resource_type: 'auto',
            public_id: Date.now() + "-" + file.originalname,
        }
    }
});

export const upload = multer({ storage });
