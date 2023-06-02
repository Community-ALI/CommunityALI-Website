// FILE OVERVIEW:
// this file connects to the database and defines the different models (Services, Applications...)
// this file is required by any file that needs to access any part of the database

const mongoose = require("mongoose");
const { default: Notifications } = require("./src/components/Notification");
mongoose.set('strictQuery', false);
require('dotenv').config()

//const DATABASE_LINK = process.env.DATABASE_LINK;
const DATABASE_LINK = process.env.TESTING_DATABASE_LINK;
// OFFICIAL DATABASE (do not mess with this)
mongoose.connect(DATABASE_LINK, { useNewUrlParser: true });

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
    meetingTime: String,
    meetingDate: String,
    location: String,
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
    time: String,
    is_new_applicant: Boolean
};

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, index: true },
        username: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        verified: { type: Boolean, required: true }
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