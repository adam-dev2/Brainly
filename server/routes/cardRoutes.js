const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const Card = require('../models/Card');


router.get('/',async(req,res) => {
    try{
        const findCards = await Card.findById(id);
        if(!findCards) {
            return res.status(201).json({message: 'No Cards available'});
        }
        return res.status(200).json({message: 'Succefully fetched card', cards: findCards});
    }catch(err) {
        return res.status(500).json({message: `Error while fetching Card`});
    }
})

router.get('/:userId',async(req,res) => {
    const {userId} = req.params;
    try{
        const findCards = await Card.find({userId});
        if(findCards.length === 0) {
            return res.status(201).json({message: 'No Cards available'});
        }
        return res.status(200).json({message: 'Succefully fetched card', cards: findCards});
    }catch(err) {
        return res.status(500).json({message: `Error while fetching Card`});
    }
})

router.post('/create',async(req,res) => {
    const {title,link,summary,tags} = req.body;
    try {
        const newCard = new Card({userId:req.user.id, title,link,summary,tags});
        await newCard.save();
        return res.status(200).json({message: "Card Created Sucessfully",Card: newCard});
    }catch(err) {
        return res.status(500).json({message:`Error while Creating Card ${err}`});
    }
})

router.put('/edit/:id',async(req,res) => {
    const {id} = req.params;
    const {title,link,summary,tags} = req.body;
    try{
        const editCard = await Card.findById(id);
        if(!editCard) {
            return res.status(404).json({message: 'Card Not found'});
        }
        editCard.title = title
        editCard.link = link
        editCard.summary = summary
        editCard.tags = tags

        await editCard.save();

        return res.status(200).json({message: 'Successfully create Edited Card',Card: editCard});
    }catch(err) {
        return res.status(500).json({message: `Error while editing Card ${err}`});
    }
})

router.delete('/delete/:id',async(req,res) => {
    const {id} = req.params;
    try{
        const deleteCard = await Card.findById(id);
        if(!deleteCard) {
            return res.status(404).json({message: 'No Card to delete'});
        }

        await Card.findByIdAndDelete(id);

        return res.status(200).json({message: 'Successfully deleted Card'});
    }catch(err) {
        return res.status(500).json({message: `Error while deleting Card ${err}`});
    }
}) 

module.exports = router;