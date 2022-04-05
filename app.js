if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config()
}

const express = require("express");
const secure = require("ssl-express-www")
const expressStaticGzip = require("express-static-gzip");
const path = require("path")
const connectDB = require("./db/db")

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(secure)

connectDB()

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Backend started on port " + port))


app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "/robots.txt"))
})

//User Requests
app.use("/user/auth", require("./routes/user/auth"))
app.use("/user/register", require("./routes/user/register"))
app.use("/user/login", require("./routes/user/login"))
app.use("/user/update", require("./routes/user/update"))
app.use("/user/password", require("./routes/user/password"))

//List Requests
app.use("/list/new", require("./routes/list/new"))
app.use("/list/month", require("./routes/list/month"))

//Item Requests
app.use("/item/new", require("./routes/item/new"))
app.use("/item/edit", require("./routes/item/edit"))
app.use("/item/crossoff", require("./routes/item/crossoff"))
app.use("/item/delete", require("./routes/item/delete"))
app.use("/item/move", require("./routes/item/move"))
app.use("/item/notes", require("./routes/item/notes"))

// Admin Requests
app.use("/admin/users", require("./routes/analytics/user/users"))

//Service Requests
app.use("/services/weather", require("./routes/services/weather"))

//sets routes for static build in production
if (process.env.NODE_ENV === "production") {
  app.use(expressStaticGzip(path.resolve(__dirname, 'client', "build")))

  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, 'client', "build", "index.html")))
}
