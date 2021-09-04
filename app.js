if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

//requires and initializes node modules

const express = require("express");
const router = express.Router();
const cors = require("cors");
const secure = require("ssl-express-www")
const axios = require('axios')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path")
const connectDB = require("./db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator')
const auth = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 5000;


//connects to mongoDB
connectDB();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(secure)
app.listen(port, () => console.log("Backend started on port " + port));

const User = require("./db/models/user")
const List = require("./db/models/list")
const {Item} = require("./db/models/items")


//sets routes for static build in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, 'client', "build", "index.html")));
  app.get("/today", (req, res) => res.sendFile(path.resolve(__dirname, 'client', "build", "index.html")));
}


//verifies a logged in user to access protected routes
app.use("/user/auth", require("./routes/user/auth"))

//POST request to register a new user
app.use("/user/register", require("./routes/user/register"))

//logs in user
app.use("/user/login", require("./routes/user/login"))



//GET request to display list from user inputed date
app.get("/date/:listName", auth, (req, res) => {
  const newDay = req.params.listName;
  List.findOne({ user: req.user.id, name: newDay }, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        const list = new List({
          user: req.user.id,
          name: newDay,
          items: []
        });
        list.save();

        res.send({ list: newDay, items: [], date: newDay, status: "no list found, created" })
      } else {
        console.log(foundList);
        res.send({ list: newDay, items: foundList.items, status: "found a list" })
      }
    }
  })
})

//adds a new item to the current list
app.post("/item/new", auth, (req, res) => {
  const itemName = req.body.item;
  const listName = req.body.list
  const item = new Item({
    item: itemName,
    style: "",
    moved: false
  })
  List.findOne({ "user": req.user.id, "name": listName }, (err, foundList) => {
    if (err) console.log(err);
    foundList.items.push(item);
    foundList.save();
    res.send({ list: listName, items: [...foundList.items] })
  })
})

//edits an existing item in the current list
app.post("/item/edit", auth, (req, res) => {
  const { list, item, oldText } = req.body
  console.log(list, item, oldText);

  List.findOneAndUpdate({ "user": req.user.id, "name": list, "items.item": oldText }, { "$set": { "items.$.item": item } }, (err, success) => {
    if (err) {
      console.log((err));
    } else {
      console.log(("items edited"));
      List.findOne({ "user": req.user.id, "name": list }, (err, foundList) => {
        if (err) console.log(err);
        res.send({ list, items: [...foundList.items] })
      })
    }
  })

})


//adds style detail to list item to remain crossed-off when page is reloaded
app.use("/item/crossoff", require("./routes/item/crossoff"))
// app.post("/item/crossoff", auth, (req, res) => {
//   const crossedItem = req.body.item
//   const listName = req.body.list
//   const style = req.body.style
//   var newStyle = style !== "" ? "strikethrough" : ""

//   List.findOneAndUpdate(
//     { "user": req.user.id, "name": listName, "items.item": crossedItem },
//     { "$set": { "items.$.style": newStyle } },
//     (err, success) => {
//       if (err) {
//         console.log(err);
//       } else { console.log("item updated"); }
//     })
//   res.end();
// })


//Deletes selected item from database
app.delete("/item/delete", auth, async (req, res) => {
  const { list, item } = req.body
  await List.updateOne(
    { "user": req.user.id, "name": list },
    { "$pull": { "items": { "item": item } } },
    (err) => {
      if (err) {
        console.log(err);
        res.json({ msg: "There was a error deleting this item" })
      } else {
        res.json({ msg: `Deleted Item ${req.body.item}` })
      }
    })
})


//moves item to the next day
app.post("/item/move", auth, (req, res) => {

  const { list, item, style } = req.body
  const date = new Date(list)

  const skipWeekend = () => {
    if (date.toLocaleDateString("en-US", { weekday: "long" }) === "Friday") { return 3 }
    return 1
  }

  var options = { day: '2-digit', month: 'short', year: 'numeric' };
  const nextDay = new Date(date.setDate(date.getDate() + skipWeekend())).toLocaleDateString("en-US", options).replace(/ /g, "-").replace(/,/g, "")

  List.findOne({ "user": req.user.id, "name": nextDay }, (err, foundList) => {
    if (err) console.log(err);

    const movedItem = new Item({ item, style, moved: true })

    if (!foundList) {
      const list = new List({
        user: req.user.id,
        name: nextDay,
        items: []
      });
      list.items.push(movedItem)
      list.save();
      console.log("List created and Item Moved to the next day");

    } else {
      foundList.items.push(movedItem)
      foundList.save()
      console.log("Item Moved to the next day");
    }

    if (date.toLocaleDateString("en-US", { weekday: "long" }) === "Monday") {
      res.json({ msg: "Item was copied to Monday" })
    } else {
      res.json({ msg: "Item was copied to tomorrow" });
    }

  })
})

//gets weather

app.post("/services/weather", async (req, res) => {
  const apiKey = process.env.WEATHER_API
  const location = req.body.location.toLowerCase();
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=` + location + `&appid=` + apiKey + `&units=imperial`
    );
    res.status(response.data.cod).json({ weather: response.data })
  } catch (err) {
    res.send(err)
  }
})


//Updates user info

app.patch("/user/update", auth, (req, res) => {
  const { user, name, value } = req.body
  const { _id } = user
  const set = {}
  set[name] = value
  User.findOneAndUpdate({ _id }, { "$set": set }, (err, success) => {
    if (err) {
      console.log(err)
      res.json({ msg: `Error updating ${name}` })
    } else {
      console.log(success)
      res.json({ msg: `Successfully Updated ${name}`, info: user })
    }
  })
})


app.patch("/user/password", auth, async (req, res) => {
  const {oldPass, newPass, user} = req.body
  const { _id } = user
  const dbUser = await User.findOne({ _id })
  const isMatch = await bcrypt.compare(oldPass, dbUser.password)
  const salt = await bcrypt.genSalt(10)
  const hashNew = await bcrypt.hash(newPass, salt)

  if (isMatch) {
    User.findOneAndUpdate({_id}, { password: hashNew }, (err) => {
      if (err) {
        console.error(`${dbUser.name} failed to update password field with error: ${err}`)
        res.status(500).json({msg: "There was an error updating you password"})
      } else {
        console.log(`${dbUser.name} updated password field`);
        res.status(200).json({ msg: "Password successfully updated" })
      }
    })
  } else {
    res.status(400).json({ msg: "Old password does not match"})
  }
  

  
})