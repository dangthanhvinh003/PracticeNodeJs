const mongoose = require("mongoose"); // always init in herehere

const dbState = [
  { value: 0, label: "disconnected" },
  { value: 1, label: "connected" },
  { value: 2, label: "connecting" },
  { value: 3, label: "disconnecting" },
];

const connection = async () => {
  // Or:
  try {
    const option = { dbName: "ProjectNode" };
    await mongoose.connect("mongodb://127.0.0.1:27017", option);
    console.log("OK Nha");
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find((f) => f.value === state).label, "to db"); // connected to db
  } catch (error) {
    console.log("err : ", error);
  }
};

module.exports = connection;
