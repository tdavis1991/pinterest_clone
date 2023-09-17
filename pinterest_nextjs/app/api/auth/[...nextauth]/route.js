import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider from "next-auth/providers/credentials";

import { connectToDB } from "@/utils/database";
import User from "@/models/user";

// Initialize NextAuth with Google as the authentication provider
const handler = NextAuth({
  providers: [
    // CredentialProvider({
    //   name: 'Sign in',
    //   credentials: {
    //     email: {
    //       label: 'Email',
    //       type: 'email',
    //       placeholder: 'example@example.com',
    //     },
    //     password: {label: 'Password', type: 'password'}
    //   },
    //   async authorize(credentials) {
    //     if(!credentials || !credentials.email || !credentials.password) {
    //       return null
    //     }
    //   }
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,          // Google API client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // Google API client secret
    })
  ],
  callbacks: {
    // This callback runs whenever a session is created or updated
    async session({ session }) {
      // Retrieve user information from the database based on email
      const sessionUser = await User.findOne({ email: session.user.email });
  
      // Set the session user's ID to their MongoDB _id as a string
      session.user.id = sessionUser._id.toString();
  
      return session
    },
    // This callback runs whenever a user signs in
    async signIn({ profile }) {
      try {
        await connectToDB();  // Connect to the database
  
        const userExists = await User.findOne({ email: profile.email }) // Check if the user already exists in the database
  
        if(!userExists) {
          // If the user doesn't exist, create a new user with data from Google profile
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            profilePicture: profile.picture
          })
        }
  
        return true;  // Return true to indicate successful sign-in
      } catch (error) {
        console.log(error);  // Log any errors that occur during sign-in
        return false;  // Return false to indicate an error occurred during sign-in
      }
    },
  }
})

export { handler as GET, handler as POST };  // Export the handler for both GET and POST requests
