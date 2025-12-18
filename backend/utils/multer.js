// import multer from "multer";


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) =>{
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         const filename = file.originalname.split(".")[0];
//         cb(null , filename + "-" + uniqueSuffix + ".png")
//     }

// })

// export const upload = multer({storage : storage});

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get the directory name in ES modules
const __filename = fileURLToPath(import. meta.url);
const __dirname = path.dirname(__filename);

// Define the uploads directory - using absolute path
const uploadsDir = path.join(__dirname, '../uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // ✅ Use absolute path
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = file.originalname.split(". ")[0];
        cb(null, filename + "-" + uniqueSuffix + ".png");
    }
});

export const upload = multer({ storage: storage });