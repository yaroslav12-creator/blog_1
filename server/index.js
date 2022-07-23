import express from 'express';  
import fs from 'fs';
import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors';

import { loginValidation, registerValidation, postCreateValidation } from './validations.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { UserController, PostController } from './controllers/index.js';

mongoose.connect('mongodbClusterURl')
    .then(() => console.log('Successfully connected to DB'))
    .catch((err) => console.log('DB connection error:\n', err));

const app = express();
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if(!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Public user routes
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
// Protected user routes
app.get('/auth/me', checkAuth, UserController.getMe);
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/tags', PostController.getLastTags);
// Public post routes 
app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
//Protected post routes
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update); 

app.listen(4444, () => {
    console.log(`Server is listeting on port 4444`);
});
