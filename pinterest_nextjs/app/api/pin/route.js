import { connectToDB } from "@/utils/database";
import Pin from "@/models/pin";

export const GET = async (reg) => {
  try {
    await connectToDB();

    const pins = await Pin.find({}).populate('creator');

    return new Response(JSON.stringify(pins), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch pins', { status: 500 })
  }
}