import mongoose from "mongoose";

export const mongoConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017", {
      dbName: "Demo-apis-testing",
    })
    .then(() => {
      console.log(`MongoDB Connected Successfully !`);
    })
    .catch((e) => {
      console.log(`Error while connecting to dataBases ${e}`);
    });
};
