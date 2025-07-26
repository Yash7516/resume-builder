import Resume from '../models/resumeModel.js';

import path from 'path';

export const createResume = async (req, res) => {
    try {
        const {title} = req.body;

        // default template 
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };

const newResume = await Resume.create({
   userId: req.user._id,
   title,
   ...defaultResumeData,
   ...req.body
})
        res.status(201).json(newResume);
        
    } catch (error) {
        res.status(500).json({ message: 'Error creating resume', error: error.message });
    }
}


// get resume 

export const getResumes = async(req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({
            updatedAt: -1
           
        });
        res.status(200).json(resumes);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching resumes', error: error.message });  
        
    }
}

// get resume by id

export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resume', error: error.message });
        
    }
}

// update resumes 

export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        // merge the existing resume data with the new data
        Object.assign(resume, req.body);
        //save the updated resume
        const savedResume = await resume.save();
        res.status(200).json(savedResume);
        
    } catch (error) {
        res.status(500).json({ message: 'Error updating resume', error: error.message });
        
    }
}

// delete resume

export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        const uploadsFolder = path.join(process.cwd(), 'uploads');

        if(resume.thumbnailLink){
            const oldThumbnail = path.join(uploadsFolder,path.basename(resume.thumbnailLink))
            if (fs.existsSync(oldThumbnail)) {
                fs.unlinkSync(oldThumbnail);
            }
        }
        if(resume.profileInfo?.profilePreviewUrl){
            const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
            if (fs.existsSync(oldProfile)) {
                fs.unlinkSync(oldProfile);
            }
        }
        // delete resume doc 

        const deleted  = await Resume.findByIdAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!deleted) {
            return res.status(404).json({ message: 'Resume not found' });
        }           
        res.status(200).json({ message: 'Resume deleted successfully' });
       
    } catch (error) {
        res.status(500).json({ message: 'Error deleting resume', error: error.message });
    }
}