const express = require('express');
const request = require('request-promise');

const router = express.Router();


router.get('/', (req, res) => {
  res.json({ success: true });
});

router.get('/:user', async (req, res, next) => {
  try {
    const { user } = req.params;
    const options = {
      headers: {
        'User-Agent': 'node-testing-example'
      },
      json: true
    };
    const data = await request.get(`https://api.github.com/users/${user}`, options);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
