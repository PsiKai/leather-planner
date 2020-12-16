//requires and initializes node modules

const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path")
const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {body, validationResult} = require('express-validator')
const config = require("config")
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
    style: String
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
[
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please include a valid email.").isEmail(),
    body(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ], 
  async(req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
      }

      const {name, email, password} = req.body;
      try {
          let user = await User.findOne({email});
          if (user) {
              return res.status(400).json({msg: "User already exists"})
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
            payload, config.get("jwtSecret"),
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
            return res.status(400).json({ msg: "invalid credentials" });
          }
    
          const isMatch = await bcrypt.compare(password, user.password);
    
          if (!isMatch) {
            return res.status(400).json({ msg: "invalid credentials" });
          }
    
          const payload = {
            user: {
              id: user.id,
            },
          };
    
          jwt.sign(
            payload,
            config.get("jwtSecret"),
            {
              expiresIn: 360000,
            },
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
        style: ""
    })
     List.findOne({"user": req.user.id, "name": listName}, (err, foundList) => {
       if (err) console.log(err);
       foundList.items.push(item);
        foundList.save();
        res.send({list: listName, items: [...foundList.items]})
        })
})


//adds style detail to list item to remain crossed-off when page is reloaded
app.post("/delete", auth, (req, res) => {
    const crossedItem = req.body.item
    const listName = req.body.list
    const style = req.body.style
    var newStyle = style !== "" ? "strikethrough" : ""

    List.findOneAndUpdate({"user": req.user.id, "name": listName, "items.item": crossedItem}, {"$set": {"items.$.style": newStyle}}, (err, success) => {
        if (err) {console.log(err);
        } else {console.log("item updated");}
    })
    res.end();
})

