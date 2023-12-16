import express from 'express';
import resultRepository from '../repositories/resultRepository.js';

const router = express.Router();

// Get all results
router.get('/', async (req, res) => {
  try {
    const results = await resultRepository.getAllResults();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific result by ID
router.get('/:resultId', async (req, res) => {
  const { resultId } = req.params;

  try {
    const result = await resultRepository.getResultById(resultId);

    if (!result) {
      return res.status(404).json({ error: 'Result not found' });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new result
router.post('/', async (req, res) => {
  const resultData = req.body;

  try {
    const createdResult = await resultRepository.createResult(resultData);
    res.status(201).json(createdResult);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a result by ID
router.put('/:resultId', async (req, res) => {
  const { resultId } = req.params;
  const updatedResultData = req.body;

  try {
    const updatedResult = await resultRepository.updateResult(resultId, updatedResultData);

    if (!updatedResult) {
      return res.status(404).json({ error: 'Result not found' });
    }

    res.json(updatedResult);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a result by ID
router.delete('/:resultId', async (req, res) => {
  const { resultId } = req.params;

  try {
    const deletedResult = await resultRepository.deleteResult(resultId);

    if (!deletedResult) {
      return res.status(404).json({ error: 'Result not found' });
    }

    res.json(deletedResult);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
