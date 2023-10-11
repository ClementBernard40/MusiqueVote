const Vote = require('../models/voteModel');
const Music = require('../models/musiqueModel')

exports.getAllVotes = async (req,res) => {

    try {
        const votes = await Vote.find({music_id: req.params.id_music});
        res.status(200);
        res.json(votes);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
    }
}



    exports.getAVote = async (req,res) => {

        try {
            const votes = await Vote.findById(req.params.id_vote);
            res.status(200);
            res.json(votes);
        } catch (error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }
    
    
    }
    
    





exports.createAVote = async (req,res) => {
    try {

        await Music.findById(req.params.id_music)
        const newVote = new Vote({...req.body, music_id: req.params.id_music});
         if (req.body.note >= 1 && req.body.note <= 5) {
            try {
                
                const vote = await newVote.save();
                res.status(201);
                res.json(vote);
            } catch (error) {
                console.log(error);
                res.status(500);
                res.json({message: "Erreur serveur.(db"});
            }
        } else {
             res.status(500);
             res.json({message: "le vote doit etre entre 1 et 5"});
        } 
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({message: "Erreur serveur(music inexistant)."});
    } 
}



    exports.deleteAVote = async (req,res) => {
        try {
        await Vote.findByIdAndDelete(req.params.id_vote);       
            if (!Vote) {
                res.status(204)
                res.send("vote not find");
            } else {
                res.status(204).json({message: "vote supprimé"});
            }
        } catch (error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }
            
    }
exports.updateAVote = async (req,res) => {
    try {
        
    if (req.body.note >= 1 && req.body.note <= 5) {
        try {
            const vote = await Vote.findByIdAndUpdate(req.params.id_vote, req.body, {new: true});
            res.status(203);
            res.json(vote);
            } catch (error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur(db)."});
        }
    } else {
        res.status(500);
        res.json({message: "le vote doit etre entre 1 et 5"});
   }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur.(musique inexistante)"});
    }
}


exports.getAResult = async (req,res) => {

    try {
        const result = await Vote.find({music_id: req.params.id_music});
        console.log(result.length)
        if (result.length === 0) {
            res.status(404).json({ message: 'Aucun vote trouvé pour cette musique' });
            return;
        }

        const totalPoints = result.reduce((acc, vote) => acc + vote.note, 0)/result.length;
        res.status(200);
        res.json(totalPoints);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
    }
}





exports.getPlusVoté= async (req, res) => {
    try {
        const result = await Vote.aggregate([
            {
                $group: {
                    _id: "$musique_id",
                    totalVotes: { $sum: "$vote" }
                }
            },
            {
                $sort: { totalVotes: -1 }
            },
            {
                $limit: 1
            }
        ]);

        if (result.length === 0) {
            res.status(404).json({ message: 'Aucune musique trouvée' });
            return;
        }

        // Récupérez l'ID de la musique la plus votée
        const mostVotedMusicId = result[0]._id;

        // Recherchez les détails de la musique la plus votée dans la collection Musique
        const mostVotedMusic = await Musique.findById(mostVotedMusicId);

        res.status(200).json({ mostVotedMusic, totalVotes: result[0].totalVotes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur (getMostVotedMusic)' });
    }
};
