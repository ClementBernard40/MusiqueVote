const Music = require('../models/musiqueModel');

exports.listAllMusic = async (req,res) => {
    try {
        const musics = await Music.find({});
        res.status(200);
        res.json(musics);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
    }


}

exports.getAMusic = async (req,res) => {

        try {
            const musics = await Music.findById(req.params.id_music);
            res.status(200);
            res.json(musics);
        } catch (error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }
    
    
    }
    
    





exports.createAMusic = async (req,res) => {
    const newMusic = new Music(req.body);
    
        try {
            const music = await newMusic.save();
            res.status(201);
            res.json(music);
        } catch (error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }
    
    }


    
        exports.deleteAMusic = async (req,res) => {
                try {
                    await Music.findByIdAndDelete(req.params.id_music);
                    res.status(202);
                    res.json({message: "article supprimé"});
                } catch (error) {
                    res.status(500);
                    console.log(error);
                    res.json({message: "Erreur serveur."});
                }
            
            }
           





            exports.updateAMusic = async (req,res) => {   
                    try {
                        const music = await Music.findByIdAndUpdate(req.params.id_music, req.body, {new: true});
                        res.status(203);
                        res.json(music);
                    } catch (error) {
                        res.status(500);
                        console.log(error);
                        res.json({message: "Erreur serveur."});
                    }
                
                }
    
