const express = require('express');
const router = express.Router();

const voteController = require('../controllers/voteController');


    router
        .route('/musics/:id_music/votes')
            .get(voteController.getAllVotes)
            .post(voteController.createAVote);


    router
        .route('/votes/:id_vote')
            .get(voteController.getAVote)
            .delete(voteController.deleteAVote)
            .put(voteController.updateAVote);
    
    router
        .route('/result/:id_music/')
        .get(voteController.getAMoy)

    router
        .route('/result/')
        //.get(voteController.getPlusVote)
        

        
    module.exports = router;

