import express from 'express';
import {deleteResume, createResume, getResumes, getResumeById, updateResume } from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleWare.js';
import { uploadResumeImages } from '../controllers/uploadImages.js';


const resumeRouter = express.Router();

resumeRouter.post('/',protect, createResume);
resumeRouter.get('/', protect, getResumes);
resumeRouter.get('/:id', protect, getResumeById);
resumeRouter.put('/:id', protect, updateResume);
resumeRouter.put('/:id/upload-images', protect, uploadResumeImages);
resumeRouter.delete('/:id', protect, deleteResume);

export default resumeRouter;
