"use server"

import connectDB from "@/lib/connectDB";
import { TextFile } from "@/models/text.model";
import bcrypt from "bcrypt";
export async function fetchFileInfo(filename: string, password: string) {
  try {
    await connectDB();

    const textFile = await TextFile.findOne({ filename });
    if (!textFile) {
      return {
        success: false,
        message: "No file found with this name.",
      };
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      textFile.hashedPassword
    );

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Incorrect password.",
      };
    }

    return {
      success: true,
      text: textFile.text,
    };
  } catch (error) {
    console.log("Error retrieving text file:", error);

    return {
      success: false,
      message: "An error occurred while retrieving the text file.",
    };
  }
}
