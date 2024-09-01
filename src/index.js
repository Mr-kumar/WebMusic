import dotenv from "dotenv";
import connectDB from "./db/database.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then((result) => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!!", err);
  });
