import { connectToDB } from "@/utils/database";
import Pin from "@/models/pin";

export const POST = async (req) => {
  const { title, description, imageUrl, board, userId } = await req.json();

  try {
    await connectToDB();

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