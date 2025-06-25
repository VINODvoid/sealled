import mongoose from "mongoose";
const MONGOOSE_URI = process.env.MONGOOSE_URI;

async function ConnectDB()
{
    if (!MONGOOSE_URI) {
        throw new Error("MONGOOSE_URI is not defined in environment variables.");
    }
    try {
        const connectionInstance = await mongoose.connect(MONGOOSE_URI);

    } catch (error) {
            console.log(error);
    }
}

export default ConnectDB;