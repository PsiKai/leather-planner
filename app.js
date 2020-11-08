const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path")
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(cors());
app.listen(port,() => console.log("Backend started on port " + port));

const itemsSchema = {
    item: String,
    style: String
  };

const Item = mongoose.model("Item", itemsSchema);

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);



app.get("/:listName", (req, res) => {
    const newDay = req.params.listName;
    console.log(newDay);
    List.findOne({name: newDay}, (err, foundList) => {
        if (!err) {
            if (!foundList) {
                const list = new List ({
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

app.post("/", (req, res) => {
    const itemName = req.body.item;
    const listName = req.body.list
    const item = new Item ({
        item: itemName,
        style: ""
    })
     List.findOne({name: listName}, (err, foundList) => {
       if (err) console.log(err);
       foundList.items.push(item);
        foundList.save();
        res.send({list: listName, items: [...foundList.items]})
        })
})

app.post("/delete", (req, res) => {
    const crossedItem = req.body.item
    const listName = req.body.list
    const style = req.body.style
    var newStyle = style !== "" ? "strikethrough" : ""

    List.findOneAndUpdate({"name": listName, "items.item": crossedItem}, {"$set": {"items.$.style": newStyle}}, (err, success) => {
        if (err) {console.log(err);
        } else {console.log("item updated");}
    })
})

if(process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, 'client', "build", "index.html")));
  }