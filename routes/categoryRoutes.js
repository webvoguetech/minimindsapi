import express from 'express';
import categoryRepository from '../repositories/categoryRepository.js';
import { createCategory } from '../controllers/categoryController.js';
import multer from 'multer';
const router = express.Router();

const storageConfig = multer.memoryStorage();

const upload = multer({ storage: storageConfig });
import { bucket } from '../config.js';
// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await categoryRepository.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific category by ID
router.get('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await categoryRepository.getCategoryById(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new category
router.post('/',upload.single("image_url"), async (req, res) => {
  if(req.file){
    const imageBuffer = req.file.buffer;
    const imageName = req.file.originalname;
    const file = bucket.file('categories/'+Date.now()+imageName);
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
    req.body.image_url = imageUrl;
    }
  createCategory(req, res);
});

// Update a category by ID
router.put('/:categoryId', async (req, res) => {
  updateCategory(req, res);
});

// Delete a category by ID
router.delete('/:categoryId', async (req, res) => {

});

export default router;
