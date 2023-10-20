import multer, { diskStorage } from "multer";
import { extname } from 'path';

const storage = diskStorage({
	destination: (req, file, cb) => cb(null, "static/"),
	filename: (req, file, cb) => {
		const ext = extname(file.originalname);
		cb(null, `${Date.now()}${ext}`);
	},
});
const picUploader = multer({ storage: storage });

export default picUploader;