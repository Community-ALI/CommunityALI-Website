// FILE OVERVIEW:
// this file connects to the database and defines the different models (Services, Applications...)
// this file is required by any file that needs to access any part of the database

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
require('dotenv').config()
const Schema = mongoose.Schema;

const DATABASE_LINK = process.env.DATABASE_LINK; 

 mongoose.connect(DATABASE_LINK, { useNewUrlParser: true });
const serviceSchema = {
    title: {type: String, unique: true},
    serviceType: String,
    thumbnail: Buffer,
    photo: Buffer,
    pages: JSON,
    categories: Array,
    createdAt: {type: Date, required: true, default: Date.now},
    datePosted: String,
    timePosted: String,
    user: String, // top level user, can manage permissions of other users and has access to all abilities of lower level users
    Editors: Array, // can edit the service
    ApplicationManagers: Array, // can accept or reject applications
    UpdateSenders: Array, // can send updates to members
    members: Array, 
    applicants: Array, // waiting to be accepted or rejected
    messages: Array, // notifications to service members
    internshipLink: String, // for internships only
}

const applicationSchema = {
    service: String,
    name: String,
    email: String,
    phone: String,
    date: String,
    time: String,
    isoDate: String, // we should try to use this instead of date and time
    is_new_applicant: Boolean,
    // save the username of the user who created the application
    user: String,

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
        programAdmin: { type: Boolean},
        servicesEditable: {type: Array}, // list of services that the user can edit
        servicesManageable: {type: Array}, // list of services that the user can manage
        servicesSendUpdates: {type: Array}, // list of services that the user can send updates to
        administrator: { type: Boolean},
        dateCreated: {type: Date, default: Date.now},
        profileImage: Buffer,
        miniProfileImage: Buffer, // a smaller version of the profile image
        fullName: String,
        sendNotifications: { type: Boolean},
        lastNotificationCheck: { type: Date, default: Date.now },
        uncheckedMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'messages' }],
    }, { collection: 'users' }
)

//TODO implement message schema
const messageSchema = new mongoose.Schema(
    {
        sender: { type: Schema.Types.ObjectId, required: true },
        createdAt: { type: Date, required: true },
        content: { type: String, required: true }
    }
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

const Message = mongoose.model("messages", messageSchema);

const Application = mongoose.model("applications", applicationSchema);

const Services = mongoose.model("services", serviceSchema);

const User = mongoose.model("User", userSchema);

const passwordReset = mongoose.model("passwordreset", passwordResetSchema);

module.exports = {
    Services: Services,
    Application: Application,
    User: User,
    passwordReset: passwordReset,
    Message: Message
};