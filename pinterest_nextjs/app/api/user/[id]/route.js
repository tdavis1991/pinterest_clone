import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (req, { params }) => {

  try {
    await connectToDB();

    // const existingUser = await User.findById(params.id)

    const existingUser = await User.findById({ _id: "650760d60c55ff0c25865af3" })

    console.log(existingUser.boards, 'EXISTING USER')

    // return new Response(JSON.stringify(existingUser), { status: 201 })
  } catch (error) {
    return new Response('Failed to fetch user', { status: 500 })
  }
} 