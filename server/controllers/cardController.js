const Card = require('../models/Card');

exports.getAllCards = async (req, res) => {
    try {
        const findCards = await Card.find({ userId: req.user.id });
        if (!findCards || findCards.length === 0) {
            return res.status(200).json({ message: 'No cards available', cards: [] });
        }
        return res.status(200).json({ message: 'Successfully fetched cards', cards: findCards });
    } catch (err) {
        return res.status(500).json({ message: `Error while fetching cards: ${err}` });
    }
};

exports.shareable = async (req, res) => {
    const { userId } = req.params;
    console.log(userId)
    try {
        const findCards = await Card.find({ userId });
        if (!findCards || findCards.length === 0) {
            return res.status(200).json({ message: 'No cards available', cards: [] });
        }
        return res.status(200).json({ message: 'Successfully fetched shared cards', cards: findCards });
    } catch (err) {
        return res.status(500).json({ message: `Error while fetching cards: ${err}` });
    }
};

exports.createCard = async (req, res) => {
    const { title, link, summary, tags, favorite } = req.body;
    console.log(req.body)
    try {
        const newCard = new Card({
            userId: req.user.id,
            title,
            link,
            summary,
            tags,
            favorite: favorite || false
        });

        await newCard.save();
        return res.status(200).json({ message: "Card created successfully", card: newCard });
    } catch (err) {
        return res.status(500).json({ message: `Error while creating card: ${err}` });
    }
};

exports.editCard = async (req, res) => {
    const { id } = req.params;
    const { title, link, summary, tags, favorite } = req.body;
    try {
        const editCard = await Card.findById(id);
        if (!editCard) {
            return res.status(404).json({ message: 'Card not found' });
        }

        if (editCard.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        editCard.title = title;
        editCard.link = link;
        editCard.summary = summary;
        editCard.tags = tags;
        if (typeof favorite === 'boolean') {
            editCard.favorite = favorite;
        }

        await editCard.save();

        return res.status(200).json({ message: 'Successfully updated card', card: editCard });
    } catch (err) {
        return res.status(500).json({ message: `Error while editing card: ${err}` });
    }
};

exports.deleteCard = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCard = await Card.findById(id);
        if (!deleteCard) {
            return res.status(404).json({ message: 'Card not found' });
        }

        if (deleteCard.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        await deleteCard.deleteOne();

        return res.status(200).json({ message: 'Successfully deleted card' });
    } catch (err) {
        return res.status(500).json({ message: `Error while deleting card: ${err}` });
    }
};

exports.getFavoriteCards = async (req, res) => {
    try {
        const favorites = await Card.find({ userId: req.user.id, favorite: true });

        return res.status(200).json({
            message: favorites.length ? 'Successfully fetched favorite cards' : 'No favorite cards found',
            favorites
        });
    } catch (err) {
        return res.status(500).json({ message: `Error while fetching favorite cards: ${err}` });
    }
};

exports.toggleFavorite = async (req, res) => {
    const { id } = req.params;

    try {
        const card = await Card.findById(id);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        if (card.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        card.favorite = !card.favorite;
        await card.save();

        return res.status(200).json({ message: 'Favorite status toggled', card });
    } catch (err) {
        return res.status(500).json({ message: `Error toggling favorite status: ${err}` });
    }
};

exports.getAllTags = async (req, res) => { 
  try {
    const cards = await Card.find({ userId: req.user.id });
    const allTags = new Set();
    cards.forEach(card => {
      card.tags.forEach(tag => allTags.add(tag));
    });
    res.json([...allTags]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCardsByTag = async (req, res) => {
  try {
    const tag = req.params.tag;
    const cards = await Card.find({ 
      userId: req.user.id,  
      tags: tag     
    });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.exportCards = async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.user.id }).lean();
    res.setHeader("Content-Disposition", "attachment; filename=brainly-bookmarks.json");
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(cards, null, 2));
  } catch (err) {
    res.status(500).json({ message: "Failed to export cards" });
  }
}

exports.deleteCards = async (req, res) => {
    console.log(req.user.id)
  try {
    await Card.deleteMany({ userId: req.user.id });
    res.status(200).json({ message: "All cards cleared" });
  } catch (err) {
    res.status(500).json({ message: `Failed to clear cards ${err}` });
  }
}