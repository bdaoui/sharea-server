const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");


cloudinary.config(
 {
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET
}
);

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "rest-folder", // The name of the folder in cloudinary.
      allowedFormats: ["jpg", "jpeg", "webp", "png"], // The allowed formats of files to upload to cloudinary.
      use_filename: true, // Give the file a name to refer to when uploading to cloudinary.
      
    },
  });
  
  
// pass Cloudinary Storage to multer so that it can be used in the routes
const uploadCloud = multer({ storage });


module.exports = uploadCloud;