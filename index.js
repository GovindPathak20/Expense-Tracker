const express = require("express");
const dbConnect = require("./dbConnect");
const app = express();
app.use(express.json());
const userRoute = require("./routes/usersRoute");
const transactionsRoute = require("./routes/transactionsRoute");
const path = require("path");
app.use("/api/users/", userRoute);
app.use("/api/transactions/", transactionsRoute);
require("dotenv").config();

const port = process.env.PORT || 5000;

//------------------------------DEPLOYMENT----------------------------------//
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}
//--------------------------------------------------------------------------//

app.listen(port, () => console.log(`Node JS Server started at port ${port}!`));
