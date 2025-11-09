import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';
import fs, { existsSync } from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localfilePath) => {
  try {
    if (!localfilePath) return null;

    const response = await cloudinary.uploader.upload(localfilePath, {
      resource_type: 'auto',
    });

    const optimizedUrl = response.secure_url.replace(
      "/upload/",
      "/upload/f_auto,q_auto/"
    );

    console.log('Uploaded on cloudinary', optimizedUrl);
    fs.unlinkSync(localfilePath);
    return optimizedUrl;
  } catch (error) {
    console.error('Cloudinary upload failed ', error);
    if (existsSync(localfilePath)) {
      fs.unlinkSync(localfilePath);
    }
    return null;
  }
};

export { uploadOnCloudinary };
