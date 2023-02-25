const express = require("express");
const router = express.Router();
const protected = require("../Middlewares/Auth.js");
const { uploadMiddleware } = require('../Middlewares/MulterMiddleware.js');


const {
  uploadPost,
  getImages,
  getCategories,
  deletePost,
  likePost,
  savePost
} = require("../Controllers/imagesController")


router.post('/upload', protected, uploadMiddleware, uploadPost)

router.get('/images', getImages)

router.delete('/delete/:id', protected, deletePost)

router.get('/categories', getCategories)

router.put('/like/:id', protected, likePost)

router.put('/save/:id', protected, savePost)


module.exports = router;  
