const express = require('express')
const router = express.Router();
const Authentication = require('../middlewares/Authentication')
const {getAllCandidates,createCard,editCard,deleteCard,shareable} = require('../controllers/cardController')


router.get('/',Authentication,getAllCandidates)

router.get('/:userId',shareable)

router.post('/create',Authentication,createCard)

router.put('/edit/:id',Authentication,editCard)

router.delete('/delete/:id',Authentication,deleteCard) 

module.exports = router;