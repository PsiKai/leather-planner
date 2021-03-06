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
const connectDB = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {body, validationResult} = require('express-validator')
// const config = require("config")
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
app.listen(port,() => console.log("Backend started on port " + port));

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("user", UserSchema)

const itemsSchema = {
    item: String,
    style: String,
    moved: Boolean
  };

const Item = mongoose.model("Item", itemsSchema);

const listSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String,
    },
    items: [itemsSchema]
});

const List = mongoose.model("List", listSchema);


//sets routes for static build in production
if(process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static("client/build"));
  
    app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, 'client', "build", "index.html")));
    app.get("/today", (req, res) => res.sendFile(path.resolve(__dirname, 'client', "build", "index.html")));
  }


  //verifies a logged in user to access protected routes
  app.get("/getUser", auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
 
  //POST request to register a new user
app.post("/register",
  // [
  //   body("name", "Name is required").not().isEmpty(),
  //   body("email", "Please include a valid email.").isEmail(),
  //   body(
  //     "password",
  //     "Please enter a password with 6 or more characters"
  //   ).isLength({ min: 6 }),
  // ], 
  async (req, res) => {
      // const errors = validationResult(req);
      // console.log(!errors.isEmpty());
      // if (!errors.isEmpty()) {
      //     return res.status(400).json({msg: errors.array()[0].msg});
      // }


      const {name, email, password} = req.body;
      try {
          let user = await User.findOne({email});
          if (user) {
              return res.status(400).json({msg: "Email is already registered"})
          }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(
            payload, process.env.SECRET,
            {expiresIn: 36000},
            (err, token) => {
                if (err) throw errors;
                res.json({token})
            }
        )
      } catch (err) {
          console.error(err.message);
          res.status(500).send("Server error")
      }
  })


  //logs in user
app.post("/login",
    [
    body("email", "Please include a valid email").isEmail(),
    body("password", "password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
          let user = await User.findOne({ email });
          if (!user) {
            return res.status(400).json({ msg: "Email or password is incorrect" });
          }
    
          const isMatch = await bcrypt.compare(password, user.password);
    
          if (!isMatch) {
            return res.status(400).json({ msg: "Email or password is incorrect" });
          }
    
          const payload = {
            user: {
              id: user.id,
            },
          };
    
          jwt.sign(
            payload,
            process.env.SECRET,
            {expiresIn: 360000},
            (err, token) => {
              if (err) throw errors;
              res.json({ token });
            }
          );
        } catch {
          console.error(err.message);
          res.status(500).send("server error");
        }
  })


//GET request to display list from user inputed date
app.get("/date/:listName", auth, (req, res) => {
    const newDay = req.params.listName;
    List.findOne({user: req.user.id, name: newDay}, (err, foundList) => {
        if (!err) {
            if (!foundList) {
                const list = new List ({
                    user: req.user.id,
                    name: newDay,
                    items: []
                });
              list.save();

              res.send({list: newDay, items: [], date: newDay})
            } else {
            res.send({list: newDay, items: foundList.items})
            }
        }
    }) 
})

//adds a new item to the current list
app.post("/", auth, (req, res) => {
    const itemName = req.body.item;
    const listName = req.body.list
    const item = new Item ({
        item: itemName,
        style: "",
        moved: false
    })
    List.findOne({"user": req.user.id, "name": listName}, (err, foundList) => {
      if (err) console.log(err);
        foundList.items.push(item);
        foundList.save();
        res.send({list: listName, items: [...foundList.items]})
    })
})

//edits an existing item in the current list
app.post("/edit", auth, (req, res) => {
  const {list, item, oldText} = req.body
  console.log(list, item, oldText);
  
  List.findOneAndUpdate({"user": req.user.id, "name": list, "items.item": oldText}, {"$set": {"items.$.item": item}}, (err, success) => {
    if (err) {console.log((err));
    } else {console.log(("items edited"));
    List.findOne({"user": req.user.id, "name": list}, (err, foundList) => {
      if (err) console.log(err);
        res.send({list, items: [...foundList.items]})
    })
    }
  })
  
})


//adds style detail to list item to remain crossed-off when page is reloaded
app.post("/delete", auth, (req, res) => {
    const crossedItem = req.body.item
    const listName = req.body.list
    const style = req.body.style
    var newStyle = style !== "" ? "strikethrough" : ""

    List.findOneAndUpdate(
      {"user": req.user.id, "name": listName, "items.item": crossedItem}, 
      {"$set": {"items.$.style": newStyle}}, 
      (err, success) => {
        if (err) {console.log(err);
        } else {console.log("item updated");}
    })
    res.end();
})


//Deletes selected item from database
app.delete("/delete", auth, async (req, res) => {
  const {list, item} = req.body
  await List.updateOne(
    {"user": req.user.id, "name": list}, 
    {"$pull": {"items": {"item": item}}}, 
    (err) => {
      if (err) {
        console.log(err);
        res.json({msg: "There was a error deleting this item"})
      } else {
        res.json({msg: `Deleted Item ${req.body.item}`})
      }
  })
})


//moves item to the next day
app.post("/move", auth, (req, res) => {

  const {list, item, style} = req.body
  const date = new Date(list)

  const skipWeekend = () => {
    if (date.toLocaleDateString("en-US", {weekday: "long"}) === "Friday") {return 3}
    return 1
  }

  var options = {day: '2-digit', month: 'short', year: 'numeric'};
  const nextDay = new Date(date.setDate(date.getDate() + skipWeekend())).toLocaleDateString("en-US", options).replace(/ /g, "-").replace(/,/g, "")

  List.findOne({"user": req.user.id, "name": nextDay}, (err, foundList) => {
    if (err) console.log(err);

    const movedItem = new Item ({item, style, moved: true})

    if (!foundList) {
      const list = new List ({
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

    if (date.toLocaleDateString("en-US", {weekday: "long"}) === "Monday") {
      res.json({msg: "Item was copied to Monday"})
    } else {
      res.json({msg: "Item was copied to tomorrow"});
    }
  
  })
})

//gets weather

app.post("/weather", async (req, res) => {
  const apiKey = process.env.WEATHER_API
  const location = req.body.location.toLowerCase();
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=` + location + `&appid=` + apiKey + `&units=imperial`
    );
    res.status(response.data.cod).json({weather: response.data})
  } catch (err) {
    res.send(err)
  }
})
