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

export const Delete =  async (req, { params }) => {
  try {
    await connectToDB();

    await Pin.findByIdAndDelete(params.id);

    return new Response('Pin successfully deleted', { status: 200 })
  } catch (error) {
    return new Response('Error deleting Pin', { status: 500 })
  }
}

export const Update =  async (req, { params }) => {
  
}