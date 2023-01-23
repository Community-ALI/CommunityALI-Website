const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Ben:test123@cluster0.hcq9y6f.mongodb.net/application-DB", {useNewUrlParser: true});

const applicationSchema = {
  
    name: String,
    email: String,
    w_number: String

}

const Application = mongoose.model("applications",applicationSchema);


app.post("/application-create", function (req,res) { // FIXME change application-create to the name of the application
    console.log('posting service');
    const apply = new Application({
      name: req.body.name,
      email: req.body.email,
      w_number: req.body.w_number
    });
    apply.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.send("Successfully added service!");
      }
    });
  });

// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/index.html");
// });

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});