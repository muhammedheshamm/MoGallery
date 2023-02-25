const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../mogallery/src/assets/uploadedImages');
  },
  filename: function (req, file, cb) {
    const filePath = `MoGallery-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filePath);
  },
});

const uploadMiddleware = (request, response, next)=>{
  try{
    const upload = multer(
      { 
        storage: storage,
        fileFilter: function (req, file, cb) {
          const filetypes = /jpeg|jpg|png|gif/;
          const mimetype = filetypes.test(file.mimetype);
          const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
          if (mimetype && extname) {
            return cb(null, true);
          }
          cb(new Error('Only image or GIF are allowed'), false);
        }
      }
      ).single('image');
    upload(request, response, (err) => {
      if (err) {
        return response.json({ success: false , message: err.message });
      }
      next();
    });
  }
  catch(err){
    console.log(err);
  }
};


const deleteImage  = (fileName) => {
  fs.unlink(path.join('../mogallery/src/assets/uploadedImages', fileName),
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
  })
} 

module.exports = { uploadMiddleware, deleteImage };
