import mongoose from "mongoose";

export const mongoConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Demo-apis-testing",
    })
    .then(() => {
      console.log(`MongoDB Connected Successfully !`);
    })
    .catch((e) => {
      console.log(`Error while connecting to dataBases ${e}`);
    });
};
