import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    // const existingUser = await User.findById(params.id).populate('pins').exec();
    
    const existingUser = await User.findById(params.id)
    .populate({
      path: 'boards',
      populate: {
        path: 'pins',
        model: 'Pin'
      }
    })
    .exec();

  // Accessing populated boards with populated pins within each board
  const modifiedUser = existingUser.boards.map((board) => {
    return {
      boardName: board.name,
      firstPin: board.pins.length > 0 ? board.pins[0] : null, // Get the first pin or null if empty
      length: board.pins.length,
      id: board._id
    };
  });

  console.log(modifiedUser);

    return new Response(JSON.stringify({ existingUser, modifiedUser }), { status: 201 })
  } catch (error) {
    return new Response('Failed to fetch user', { status: 500 })
  }
} 