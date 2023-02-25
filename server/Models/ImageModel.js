const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  image: {
    type: Buffer,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  title : {
    type: String,
    required: true
  },
  description : {
    type: String,
    required: false
  },
  category : {
    type: String,
    required: true
  },
  likes : {
    type: Number,
    default: 0
  },
  likers : {
    type: Array,
    default: []
  },
  saves : {
    type: Number,
    default: 0
  },
  savers : {
    type: Array,
    default: []
  },
  originalName : {
    type: String,
    required: true
  },
  author : {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
