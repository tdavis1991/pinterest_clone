import { connectToDB } from "@/utils/database";
import Pin from "@/models/pin";
import User from "@/models/user"

export const POST = async (req) => {
  const { title, description, imageUrl, board, userId } = await req.json();

  try {
    await connectToDB();

    const newPin = Pin({ 
      title: title,
      description: description || '',
      imageUrl: imageUrl,
      board: board || '',
      creator: userId,
    })

    const user = await User.findById(userId)

    if(!user) {
      return new Response(JSON.stringify({ status: 404, message: 'Must sign in to create pin.' }))
    }

    const boardExist = user ? user.boards.some(b => b.name === board) : false;

    if(boardExist) {
      for(let i = 0; i < user.boards.length(); i++) {
        if(user.boards[i].name === boardExist) {
          user.boards[i].pins.push(newPin._id)
        }else {
          user.boards.push
        }
      }
    }

    user.pins.push(newPin._id);

    await newPin.save();
    await user.save();

    console.log('New Pin ID:', newPin._id);
    console.log('User Pins:', user.pins);

    return new Response(JSON.stringify(newPin), { status: 201, message: 'Pin created sucessfully!' })
  } catch (error) {
    return new Response(JSON.stringify({ status: 500, message: 'Server error' }))
  }
}