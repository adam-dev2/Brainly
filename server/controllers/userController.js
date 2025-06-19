const User = require('../models/User');

exports.getUser = async(req,res) => {
    try{
        res.status(200).json({message: "hehehh"})
    }catch(err){
        res.status(500).json({message: `Error while fetching user details ${err}`})
    }
}