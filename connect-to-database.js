// FILE OVERVIEW:
// this file connects to the database and defines the different models (Services, Applications...)
// this file is required by any file that needs to access any part of the database

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
require('dotenv').config()

const DATABASE_LINK = process.env.TESTING_DATABASE_LINK;

 mongoose.connect(DATABASE_LINK, { useNewUrlParser: true });
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
        dateCreated: {type: Date, default: Date.now},
        profileImage: Buffer,
        fullName: String
    }, { collection: 'users' }
)

const passwordResetSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: false},
        // I added username because of an error about the 'username' field having to be unique.  
        // I had no username in the schema, so I was really confused.  Still am.
        // I don't know why but this line fixed it
        username: { type: String, required: false, unique: false}, 

        token: String, // the secure token
        createdAt: { type: Date, default: Date.now, expires: '1h' } // Token will expire after 1 hour
    }
)

const Application = mongoose.model("applications", applicationSchema);

const Services = mongoose.model("services", serviceSchema);

const User = mongoose.model("User", userSchema);

const passwordReset = mongoose.model("passwordreset", passwordResetSchema);

module.exports = {
    Services: Services,
    Application: Application,
    User: User,
    passwordReset, passwordReset
};