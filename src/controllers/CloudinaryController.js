const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (fileBuffer, folder) => {
  try {
    return await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(fileBuffer);
    });
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};

module.exports = { uploadToCloudinary };
