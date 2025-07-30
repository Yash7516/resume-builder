import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

const PORT = 4000;

app.use(cors());


//connect db 
connectDB()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection failed:', err));
// middleware

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/resume',resumeRoutes);
app.use('/uploads',
    express.static(path.join(__dirname, 'uploads'), {
        setHeaders : (res,_path) =>{
            res.set('Access-Control-Allow-Origin', 'http://localhost:5173/');
        }
    })
);



//routes

app.get('/', (req, res) => {
    res.send('Welcome to Resume Builder API');
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});


