import mongoose from "mongoose";

export async function connectionDatabase() {
  try {
    await mongoose.connect(
      "mongodb://user:password@host:port/database?options",
    );
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error')
    return error
    // console.error("ha ocurrido un error en la base de datos");
  }
}
