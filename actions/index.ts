"use server"

import connectDB from "@/lib/connectDB";
import { TextFile } from "@/models/text.model";
import bcrypt from "bcrypt";


interface AddTextFileResult {
  success: boolean;
  message: string;
}

export async function addTextFile(
  text: string,
  textName: string,
  password: string
): Promise<AddTextFileResult> {
  try {
    await connectDB();
    const existingTextFile = await TextFile.findOne({ fileName: textName });
    console.log(existingTextFile);
    if (existingTextFile) {
      return {
        success: false,
        message: "A file with this name already exists.",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const textFile = new TextFile({
      text,
      fileName: textName,
      hashedPassword,
    });
    console.log("Text file:", textFile);

    await textFile.save();

    return {
      success: true,
      message: "Text file saved successfully!",
    };
  } catch (error: any) {
    console.log("Error saving text file:", error);

    return {
      success: false,
      message: error.message,
    };
  }
}



















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
