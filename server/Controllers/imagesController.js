const Image = require('../Models/ImageModel.js');
const User = require('../Models/userModel.js');
const fs = require('fs');
const path = require('path');
const { deleteImage } = require('../Middlewares/MulterMiddleware.js');


const uploadPost = async (req, res) => {
  const { isAdmin, username } = req.user;
  try {
    if (!isAdmin) {
      return res.json({ message: 'you are not authorized to upload', success: false });
    }
    if (req.fileValidationError) {
      return res.json({ message: req.fileValidationError.message, success: false });
    }

    fs.readFile(req.file.path, async (err, data) => {
      if (err) {
        console.error(err);
        return res.json({ message: 'Error reading the image file', success: false });
      }
      const imageOriginalName = req.file.filename;
      const image = new Image({
        image: data,
        contentType: req.file.mimetype,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category.toLowerCase(),
        originalName: imageOriginalName,
        author: username
      });

      await image.save();

      const savedImage = await Image.findOne({ originalName: imageOriginalName });

      const imageToSend = {
        ...savedImage._doc,
        src: `data:${savedImage.contentType};base64,${Buffer.from(savedImage.image).toString('base64')}`,
        image: undefined,
      };

      res.json({ message: 'Image uploaded successfully', success: true, imageToSend: imageToSend });
    });
  } catch (err) {
    console.error(err);
    res.json({ message: 'Error uploading the image', success: false });
  }
};



const getImages = async (req, res) => {
  try {
    const images = await Image.find({}).sort({ createdAt: -1 });
    const imagesObj = images.map(image => ({
      ...image._doc,
      src: `data:${image.contentType};base64,${Buffer.from(image.image).toString('base64')}`,
      image: undefined
    }))
    res.json(imagesObj)
  } catch (err) {
    res.json({ message: err })
  }
}

const getCategories = async (req, res) => {
  try {
    const images = await Image.find({})
    const categories = [...new Set(images.map(image => image.category))]
    res.json({ categories })
  } catch (err) {
    console.error(err)
    res.json({ message: 'Error retrieving categories from MongoDB: ' + err })
  }
}

const deletePost = async (req, res) => {
  if(!req.user.isAdmin){
    return res.json({ message: 'you are not authorized to delete' , success: false })
  }
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (image) {
      deleteImage(image.originalName)
      res.json({ message: 'Image deleted successfully', success: true })
    }
    else {
      res.json({ message: 'Image not found', success: false })
    }
  } catch (err) {
    res.json({ message: err })
  }
}

const likePost = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id)
    const user = await User.findById(req.user.id)

    if (image.likers.includes(user.username)) {
      image.likes--
      image.likers = image.likers.filter(liker => liker !== user.username)
      user.likedPosts = user.likedPosts.filter(image => image !== req.params.id)
      await image.save()
      await user.save()
      res.json({ success: true, disliked : true })

    }
    else {
      image.likes++
      image.likers.push(user.username)
      user.likedPosts.push(req.params.id)
      await image.save()
      await user.save()
      res.json({ success: true, disliked : false })
    }
  } catch (err) {
    res.json({ success: false, message: err.message })
    console.log(err)
  }
}

const savePost = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id)

    const user = await User.findById(req.user.id)

    if (image.savers.includes(user.username)) {
      image.saves--
      image.savers = image.savers.filter(saver => saver !== user.username)
      user.savedPosts = user.savedPosts.filter(id => id !== req.params.id)

      await image.save()
      await user.save()
      res.json({ success: true, unsaved: true })
    }
    else {
      image.saves++
      image.savers.push(user.username)
      user.savedPosts.push(req.params.id)
      await image.save()
      await user.save()
      res.json({ success:true, unsaved: false })
    }
  } catch (err) {
    res.json({ success: false, message: err })
  }
}

module.exports = {
  uploadPost,
  getImages,
  getCategories,
  deletePost,
  likePost,
  savePost
}

