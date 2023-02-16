const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const process = require('process');

AWS.config.update({
  region: process.env.AWS_POSTS_BUCKET_REGION,
  accessKeyId: process.env.AWS_S3_UPLOADS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_UPLOADS_SECRET_KEY,
});

const s3 = new AWS.S3();

const allowedExtentions = ['.png', '.jpg', '.jpeg', '.bmp'];

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_POSTS_BUCKET_NAME,
    key: (req, file, callback) => {
      const uploadDirectory = req.query.directory ?? '';
      const extension = path.extname(file.originalname);
      if (!allowedExtentions.includes(extension)) {
        return callback(new Error('wrong extension'));
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
    acl: 'public-read-write',
  }),
}).array('images', 6);
module.exports = upload;
