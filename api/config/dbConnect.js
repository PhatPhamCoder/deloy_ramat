const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery", true);

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("Database Connected Successfully!");
    mongoose.set("strictQuery", false);
  } catch (error) {
    console.log("Database error");
  }
};
module.exports = dbConnect;
