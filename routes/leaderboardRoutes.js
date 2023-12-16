import express from 'express';
import leaderboardRepository from '../repositories/leaderboardRepository.js';

const router = express.Router();

// Get leaderboard for all users
router.get('/', async (req, res) => {
  try {
    const leaderboard = await leaderboardRepository.getLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get leaderboard for today
router.get('/today', async (req, res) => {
  try {
    const todayLeaderboard = await leaderboardRepository.getTodayLeaderboard();
    res.json(todayLeaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get leaderboard for this week
router.get('/week', async (req, res) => {
  try {
    const weeklyLeaderboard = await leaderboardRepository.getWeeklyLeaderboard();
    res.json(weeklyLeaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
