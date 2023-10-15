import { connectToDB } from "@/utils/database";
import Pin from "@/models/pin";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const pin = await Pin.findById(params.id).populate('creator');

    if (!pin) return new Response("Pin Not Found", { status: 404 });

    return new Response(JSON.stringify(pin), { status: 200 })

  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}