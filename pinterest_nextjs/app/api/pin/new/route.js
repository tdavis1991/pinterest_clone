import { connectToDB } from "@/utils/database";
import Pin from "@/models/pin";

import { v2 as cloudinary } from 'cloudinary';

export const POST = async (req) => {
  const { title, description, imageUrl, board, userId } = await req.json();

  cloudinary.config({
    cloud_name: 'deuijuef3',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  })

  try {
    await connectToDB();

    const uploadImage = await cloudinary.uploader.upload(imageUrl)
    console.log(uploadImage, 'UPLOAD IMAGE');

    const newPin = Pin({ 
      creator: userId,
      title: title,
      description: description || '',
      imageUrl: imageUrl,
      board: board || '',  
    })

    await newPin.save();

    return new Response(JSON.stringify(newPin), { status: 201, message: 'Pin created sucessfully!' })
  } catch (error) {
    console.log(error);
  }
}