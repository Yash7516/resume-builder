import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {

      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

  // file filter
  const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    }
    else {
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
    }
  }

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  });
export default upload;