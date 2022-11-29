const mongoose = require("mongoose");

const ConnectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/my_database");
    console.log("mongodb connected");
  } catch (err) {
    console.log(err);
    console.log("issues" + err.message);
  }
};

const AppStarter = (port) => {
  console.log(`Listening on port ${port}`);
  ConnectToDB();
};

module.exports = { ConnectToDB, AppStarter };
module.exports.ConnectToDB = ConnectToDB;
