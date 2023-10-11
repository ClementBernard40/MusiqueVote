const express = require('express');
const router = express.Router();
const musiqueController = require('../controllers/musiqueController');

    router
    .route('/')
        .get(musiqueController.listAllMusic)
        .post(musiqueController.createAMusic);
    //.delete(postController.deleteAll);


router
    .route('/:id_post')
        .get(musiqueController.getAMusic)
        .delete(musiqueController.deleteAMusic)
        .put(musiqueController.updateAMusic); 

    module.exports = router;