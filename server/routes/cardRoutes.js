const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, cardController.getAllCandidates);
router.get('/shared/:userId', cardController.shareable);
router.post('/', authMiddleware, cardController.createCard);
router.put('/:id', authMiddleware, cardController.editCard);
router.delete('/:id', authMiddleware, cardController.deleteCard);
router.get('/favorites', authMiddleware, cardController.getFavoriteCards)   ;
router.patch('/:id/favorite', authMiddleware, cardController.toggleFavorite);
router.get('/tags', authMiddleware, cardController.getAllTags);
router.get('/tag/:tag', authMiddleware, cardController.getCardsByTag);

module.exports = router;
