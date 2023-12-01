import { connectToDB } from "@/utils/database";
import Pin from "@/models/pin";
import User from "@/models/user";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    
    const pin = await Pin.findById(params.id).populate('creator');

    if (!pin) return new Response("Pin Not Found", { status: 404 });

    console.log(pin)

    return new Response(JSON.stringify(pin), { status: 200 })

  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}

// export const DELETE =  async (req, { params }) => {
//   try {
//     await connectToDB();

//     console.log(params.id)

//     await Pin.findByIdAndDelete(params.id);
//     await User.findByIdAndDelete(params.id)

//     return new Response('Pin successfully deleted', { status: 200 })
//   } catch (error) {
//     return new Response('Error deleting Pin', { status: 500 })
//   }
// }


export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const pin = await Pin.findById(params.id);
    if (!pin) {
      return new Response('Pin not found', { status: 404 });
    }

    // Find the user that owns the pin
    const user = await User.findOne({ pins: params.id });
    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    // Remove the pin from the user's document
    user.pins.pull(params.id); // Assuming pins are stored as an array in the user document
    
    // user.boards.filter(board => board.name == pin.board).pins.pull(params.id)

    // Save the updated user document
    await user.save();

    // Delete the pin globally
    await Pin.findByIdAndDelete(params.id);

    return new Response('Pin deleted from user and globally', { status: 200 });
  } catch (error) {
    return new Response('Error deleting pin', { status: 500 });
  }
};


export const PATCH =  async (req, { params }) => {
  const { title, description, board, userId } = req.json();

  try {
    await connectToDB();

    const existingPin = await Pin.findById(params.id);
    const existingUser = await User.findById(userId);

    if(!existingPin) {
      return Response('Pin not found', { status: 404 });
    }

    existingPin.title = title;
    existingPin.description = description;
    existingPin.board = board;

    await existingPin.save();
  } catch (error) {
    return Response('Error updating pin', { status: 500 })
  }
}