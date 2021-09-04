if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const express = require("express");
const secure = require("ssl-express-www")
const path = require("path")
const connectDB = require("./db/db");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(secure)

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Backend started on port " + port));


//sets routes for static build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, 'client', "build", "index.html")));
  app.get("/today", (req, res) => res.sendFile(path.resolve(__dirname, 'client', "build", "index.html")));
}


//User Requests
app.use("/user/auth", require("./routes/user/auth"))
app.use("/user/register", require("./routes/user/register"))
app.use("/user/login", require("./routes/user/login"))
app.use("/user/update", require("./routes/user/update"))
app.use("/user/password", require("./routes/user/password"))

//List Requests
app.use("/list/new", require("./routes/list/new"))

//Item Requests
app.use("/item/new", require("./routes/item/new"))
app.use("/item/edit", require("./routes/item/edit"))
app.use("/item/crossoff", require("./routes/item/crossoff"))
app.use("/item/delete", require("./routes/item/delete"))
app.use("/item/move", require("./routes/item/move"))

//Service Requests
app.use("/services/weather", require("./routes/services/weather"))
