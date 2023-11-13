import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req, { params }) => {
  const { board, userId } = await req.json();

  try {
    await connectToDB();

    const userExist = await User.findById({ _id: userId }) 

    const boardExist = userExists ? user.boards.some(b => b.name === board) : false;

    if(boardExist) {
      
    }

  } catch (error) {
    
  }
}