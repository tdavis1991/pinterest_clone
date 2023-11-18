import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    // const existingUser = await User.findById(params.id)

    const existingUser = await User.findById(params.id)

    console.log(params.id, 'EXISTING USER')

    return new Response(JSON.stringify(existingUser), { status: 201 })
  } catch (error) {
    return new Response('Failed to fetch user', { status: 500 })
  }
} 