// FILE OVERVIEW:
// this file connects to the database and defines the different models (Services, Applications...)
// this file is required by any file that needs to access any part of the database

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
require('dotenv').config()

const DATABASE_LINK = process.env.TESTING_DATABASE_LINK;
// const DATABASE_LINK = process.env.TESTING_DATABASE_LINK;
// // OFFICIAL DATABASE (do not mess with this)
 mongoose.connect(DATABASE_LINK, { useNewUrlParser: true });
// mongoose.connect("mongodb+srv://Ben:test123@cluster0.hcq9y6f.mongodb.net/application-DB", {useNewUrlParser: true});
const serviceSchema = {
    title: {type: String, unique: true},
    serviceType: String,
    thumbnail: Buffer,
    photo: Buffer,        
    pages: JSON,
    datePosted: String,
    timePosted: String,
    user: String
  }
const applicationSchema = {
    service: String,
    name: String,
    email: String,
    w_number: String,
    date: String,
    time: String,
    is_new_applicant: Boolean
};

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, index: true },
        username: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        description: String,
        verified: { type: Boolean, required: true },
        verificationCode: {type: String},
        clubAdmin: { type: Boolean},
        internshipAdmin: { type: Boolean},
        dateCreated: String,
        profileImage: Buffer,
    }, { collection: 'users' }
)


const Application = mongoose.model("applications", applicationSchema);

const Services = mongoose.model("services", serviceSchema);

const User = mongoose.model("User", userSchema);

module.exports = {
    Services: Services,
    Application: Application,
    User: User
};