const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
  
        cb(null, path.join(__dirname,'..',"/upload/avatars"));
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      }
    }),
    limits : {
      fileSize: 80000
    },
    fileFilter : (req, file, cb) => {
      console.log(file);
      cb(null,true);
    }
});

module.exports = upload;