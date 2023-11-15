import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Pin from "@/models/pin";

export const POST = async (req, { params }) => {
  const { board, userId } = await req.json();

  try {
    await connectToDB();

    const userExist = await User.findById({ _id: userId });
    const newPin = await Pin({
      title: title,
      description: description || '',
      imageUrl: imageUrl,
      board: board || '',
      creator: userId,
    })

    const boardExist = userExists ? user.boards.some(b => b.name === board) : false;

    if(boardExist) {

    }

  } catch (error) {
    
  }
}