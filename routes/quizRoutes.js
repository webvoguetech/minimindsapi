import express from 'express';
import multer from 'multer';
// import quizRepository from '../repositories/quizRepository.js';
// import fileUploadMiddleware from '../middlewares/fileupload.middleware.js'; // Assuming you have a fileUpload middleware
import { createQuiz, deleteQuiz, getQuizzesByCategory, updateQuiz, getQuizzesCategoryLevels } from '../controllers/quizController.js';

const storageConfig = multer.memoryStorage();

const upload = multer({ storage: storageConfig });
import { bucket } from '../config.js';
const router = express.Router();

router.get('/getlevels/:category_id', async (req, res) => {
  getQuizzesCategoryLevels(req, res);
});

// Get quizzes by category
router.get('/:categoryId/:level', async (req, res) => {
  getQuizzesByCategory(req, res);
});


// Create a new quiz
router.post('/', upload.single('image_url'), async (req, res) => {
  if(req.file){
  const imageBuffer = req.file.buffer;
  const imageName = req.file.originalname;
  const file = bucket.file('quizimages/'+Date.now()+imageName);
  // const result = await bucket.upload(imageBuffer, { contentType: file.mimetype, });
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });
  stream.end(imageBuffer);
  await new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
  const expirationTime = new Date('2100-01-01T00:00:00Z').getTime();
  const [signedUrl] = await file.getSignedUrl({
    action: 'read',
    expires: expirationTime , // URL expires in 1 hour
  });
  let imageUrl = '';
  // Check if file.metadata is defined and has the expected structure
  if (file.metadata && file.metadata.mediaLink && signedUrl) {
    imageUrl = signedUrl;
  } 
  req.body.imageUrl = imageUrl;
  }
  createQuiz(req, res);
});

// Update a quiz by ID
router.put('/:quizId', upload.single('image_url'), async (req, res) => {

  if(req.file){
    const imageBuffer = req.file.buffer;
    const imageName = req.file.originalname;
    const file = bucket.file('categor/'+Date.now()+imageName);
    // const result = await bucket.upload(imageBuffer, { contentType: file.mimetype, });
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    stream.end(imageBuffer);
    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
    const expirationTime = new Date('2100-01-01T00:00:00Z').getTime();
    const [signedUrl] = await file.getSignedUrl({
      action: 'read',
      expires: expirationTime , // URL expires in 1 hour
    });
    let imageUrl = '';
    // Check if file.metadata is defined and has the expected structure
    if (file.metadata && file.metadata.mediaLink && signedUrl) {
      imageUrl = signedUrl;
    } 
    req.body.imageUrl = imageUrl;
    }
  updateQuiz(req, res);
});

// Delete a quiz by ID
router.delete('/:quizId', async (req, res) => {
  deleteQuiz(req,res);
});

export default router;
