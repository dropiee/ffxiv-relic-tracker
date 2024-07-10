import { connect } from "mongoose";

const db = async () => {
  try {
    const {
      connection: { host },
    } = await connect(process.env.MONGODB_URI);
    console.log(`Database connection: ${host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default db;

// import mongoose from "mongoose";

// export default function connectDB() {
//   const url = "mongodb://127.0.0.1/p4-node-app";

//   try {
//     mongoose.connect(url);
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
//   const dbConnection = mongoose.connection;
//   dbConnection.once("open", (_) => {
//     console.log(`Database connected: ${url}`);
//   });

//   dbConnection.on("error", (err) => {
//     console.error(`connection error: ${err}`);
//   });
//   return;
// }
