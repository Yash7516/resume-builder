// controllers/resumeController.js
import fs from 'fs';
import path from 'path';
import Resume from '../models/resumeModel.js';

export const uploadResumeImages = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const uploadsFolder = path.join(process.cwd(), 'uploads');
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const newThumbnail = req.files?.thumbnail?.[0];
    const newProfileImage = req.files?.profileImage?.[0];

    if (newThumbnail) {
      const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink || ''));
      if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);

      resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
    }

    if (newProfileImage) {
      const oldProfile = path.join(
        uploadsFolder,
        path.basename(resume.profileInfo?.profilePreviewUrl || '')
      );
      if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);

      resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
    }

    await resume.save();

    return res.status(200).json({
      message: 'Images uploaded successfully',
      thumbnailLink: resume.thumbnailLink,
      profilePreviewUrl: resume.profileInfo?.profilePreviewUrl,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
