import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve('uploads'));
  },
  filename: (req, file, callback) => {
    const hash = crypto.randomBytes(8).toString('hex');
    callback(null, `${hash}_${file.originalname}`);
  },
});
