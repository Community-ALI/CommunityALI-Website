// FILE OVERVIEW:
// this file connects to the database and defines the different models (Services, Applications...)
// this file is required by any file that needs to access any part of the database

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
require('dotenv').config()

const DATABASE_LINK = process.env.DATABASE_LINK;
// OFFICIAL DATABASE (do not mess with this)
// mongoose.connect(DATABASE_LINK, {useNewUrlParser: true});

// TESTING DATABASE (For if you want to test something that might mess up the database)
 mongoose.connect("mongodb+srv://Ben:test123@cluster0.hcq9y6f.mongodb.net/application-DB", {useNewUrlParser: true});
// switch between the two by commenting out one and uncommenting the other

const serviceSchema = {
  personal_name: String,
  personal_number: String,
  personal_email: String,
  personal_role: String,
  title: String,  
  author: String,
  author_role: String,
  photoType: String,
  photo: Buffer,        
  details: Array,
  description: String,
  contacts: Array,
  date: String,
  time: String,
  date_updated: String,
  time_updated: String,
  user: String
};

const applicationSchema = {
    service: String,
    name: String,
    email: String,
    w_number: String,
    date: String,
    time: String
};

const userSchema = new mongoose.Schema(
    {
        email:{ type: String, required: true, unique: true, index: true },
        username:{ type: String, required: true, unique: true, index: true },
        password:{ type: String, required: true },
        verified:{ type: Boolean, required: true }
        }, { collection: 'users' }
)

const Application = mongoose.model("applications", applicationSchema);

const Services = mongoose.model("services", serviceSchema);

const User = mongoose.model("User",userSchema);

module.exports = {
    Services: Services,
    Application: Application,
    User: User
};