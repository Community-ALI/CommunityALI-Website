var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const bcryptjs = require("bcryptjs");

const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const ses = new AWS.SES();

const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const user_data = require("../controllers/user-data");
const crypto = require("crypto");

const models = require("../connect-to-database");
const { param } = require("jquery");
User = models.User;
passwordReset = models.passwordReset;

function generateSixDigitCode() {
  var code = "";
  for (var i = 0; i < 6; i++) {
    var digit = Math.floor(Math.random() * 10); // Generate a random digit from 0 to 9
    code += digit.toString(); // Append the digit to the code string
  }
  return code;
}

// Function to generate a cryptographically secure random token
function generateRandomToken(length) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const token = buffer.toString("hex");
        resolve(token);
      }
    });
  });
}

const sendEmail = async (toAdress, subject, body) => {
  const params = {
    Destination: {
      ToAddresses: [toAdress],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
      },
    },
    Source: "communityalis@gmail.com",
  };

  try {
    const data = await ses.sendEmail(params).promise();
    console.log("Email sent successfully:", data.MessageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

// send a user their notifications
router.get("/get-all-user-notifications", async function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    const user_notifications = await user_data.get_all_user_notifications(
      username
    );
    res.json({
      notifications: user_notifications,
    });
    // console.log('application notifications belonging to', username, 'sent')
  } catch (error) {
    console.log(error);
    res.json({
      user_notifications: [],
      tokenUsername: "not logged in",
    });
  }
});

// login
router.post("/login", async (req, res) => {
  const usernameOrEmail = req.body.usernameOrEmail;
  const password = req.body.password;
  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  }).lean();
  if (!user) {
    return res
      .status(400)
      .json({
        status: "error",
        error: "Invalid username or email/password combination",
      });
  }
  if (!user.verified) {
    return res
      .status(400)
      .json({
        status: "unverified",
        username: user.username,
        error: "Account has not been verified.",
      });
    //FIXME: make a way to verify it
  }
  if (await bcryptjs.compare(password, user.password)) {
    // the username, password combination is successful

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        platformManager: false,
        clubAdmin: user.clubAdmin,
        eventAdmin: user.eventAdmin,
        administrator: user.administrator,
        volunteeringAdmin: user.volunteeringAdmin,
        internshipAdmin: user.internshipAdmin,
      },
      JWT_SECRET
    );

    // set the cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 86400000, // 1 day
    });

    res.json({ status: "ok", data: token });
  } else {
    res
      .status(400)
      .json({
        status: "error",
        error: "Invalid username or email/password combination",
      });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  console.log("logout");
  res.json({ status: "ok", message: "Logout successful" });
});

router.post("/verify", async (req, res) => {
  try {
    const username = req.query.username;
    const enteredCode = req.body.verificationCode;
    const user = await User.findOne({ username: username });
    if (user.verified) {
      return res
        .status(400)
        .json({ status: "error", error: "User is already verified" });
    }
    if (user.verificationCode === enteredCode) {
      user.verified = true;
      await user.save();
      // log the user in now
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
          platformManager: false,
          clubAdmin: user.clubAdmin,
          eventAdmin: user.eventAdmin,
          volunteeringAdmin: user.volunteeringAdmin,
          internshipAdmin: user.internshipAdmin,
        },
        JWT_SECRET
      );

      // set the cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 86400000, // 1 day
      });

      res.json({ status: "ok", data: token });
    } else {
      res.status(400).json({ status: "error", error: "wrong code" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error: "error" });
  }
});

router.post("/resend-code", async (req, res) => {
  try {
    const username = req.query.username;
    console.log(username);
    const user = await User.findOne({ username: username });
    if (user.verified) {
      return res
        .status(400)
        .json({ status: "error", error: "User is already verified" });
    }
    const verificationCode = generateSixDigitCode();
    sendEmail(
      user.email,
      "Verification Code",
      `Your six digit verification code is: ${verificationCode}.`
    );
    user.verificationCode = verificationCode;
    user.save();
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error: "error" });
  }
});

router.post("/delete-unverified-user", async (req, res) => {
  try {
    const username = req.query.username;

    const user = await User.findOne({ username: username });
    if (user.verified) {
      return res
        .status(400)
        .json({ status: "error", error: "User is already verified" });
    }
    user.delete();
    console.log("delete", username);
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error: "error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (user) {
      // the user account with this email exists
      const token = await generateRandomToken(32); // generate a cryptographically secure 32 character hexadecimal code
      const newReset = new passwordReset({
        email: email,
        token: token,
      });

      await newReset.save();
      sendEmail(
        email,
        "Forgot password",
        `A password reset has been requested for the account associated with this email. If you did not request this email, you can safely ignore it. Otherwise, if you meant to send this email, your link to reset your password is: https://www.communityali.com/reset-password?token=${token}`
      );
      res.json({ status: "ok" });
    } else {
      res
        .status(400)
        .json({
          status: "error",
          error: "email not associated with an account",
        });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", error: err });
  }
});

// this one is for people who remember their old password (rename in the rewrite)
router.post("/password-change-password", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    const user = await User.findOne({ username: username });
    const oldPassword = req.body.oldPassword;
    if (await bcryptjs.compare(oldPassword, user.password)) {
      // the username, password combination is successful
      plainTextPassword = req.body.newPassword;
      if (plainTextPassword.length < 8) {
        return res
          .status(400)
          .json({
            status: "error",
            error: "Password should be at least 8 characters",
          });
      }

      // Additional checks for password complexity (e.g., uppercase, lowercase, digits, special characters)
      const passwordComplexityRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/; // this could be used for special characters (?=.*[@$!%*?&])
      if (!passwordComplexityRegex.test(plainTextPassword)) {
        return res
          .status(400)
          .json({
            status: "error",
            error:
              "Password should contain at least one uppercase letter, one lowercase letter and one digit",
          });
      }

      const newPassword = await bcryptjs.hash(plainTextPassword, 10);
      user.password = newPassword;
      await user.save();
      console.log("password updated");
      res.json({ status: "ok" });
    } else {
      res.status(400).json({ status: "error", error: "Incorrect password" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "error", error: "Something went wrong" });
  }
});

// this one is for people who don't remember their old password (rename in the rewrite)
router.post("/token-change-password", async (req, res) => {
  try {
    const token = req.query.token;
    plainTextPassword = req.body.newPassword;
    if (plainTextPassword.length < 8) {
      return res
        .status(400)
        .json({
          status: "error",
          error: "Password should be at least 8 characters",
        });
    }

    // Additional checks for password complexity (e.g., uppercase, lowercase, digits, special characters)
    const passwordComplexityRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/; // this could be used for special characters (?=.*[@$!%*?&])
    if (!passwordComplexityRegex.test(plainTextPassword)) {
      return res
        .status(400)
        .json({
          status: "error",
          error:
            "Password should contain at least one uppercase letter, one lowercase letter and one digit",
        });
    }

    // Find the corresponding password reset entry in the database
    const resetEntry = await passwordReset.findOne({ token: token });

    if (resetEntry) {
      const email = resetEntry.email;

      // Find the user associated with the email in the reset entry
      const user = await User.findOne({ email: email });

      if (user) {
        // Hash the new password with bcrypt
        const password = await bcryptjs.hash(plainTextPassword, 10);

        // Update the user's password in the database
        user.password = password;
        await user.save();

        // Delete the password reset entry from the database
        await passwordReset.deleteOne({ token: token });

        return res.json({
          status: "ok",
          message: "Password updated successfully",
        });
      } else {
        return res
          .status(404)
          .json({ status: "error", error: "User not found" });
      }
    } else {
      return res
        .status(400)
        .json({ status: "error", error: "Invalid or expired token" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "error", error: "Something went wrong" });
  }
});

// send a user their services
router.post("/get-user-services", async function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    console.log(req.body);
    const user_services = await user_data.get_user_services(
      username,
      req.body.requestedFields
    );

    res.json({
      dataServices: user_services,
      tokenUsername: username,
    });
    console.log("services belonging to", username, "sent");
  } catch (error) {
    console.log(error);
    res.json({
      dataServices: [],
      tokenUsername: "not logged in",
    });
  }
});

router.post("/register", async (req, res) => {
  const { username, password: plainTextPassword, email } = req.body;
  const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !validEmailRegex.test(email)) {
    return res.status(400).json({ status: "error", error: "Invalid email" });
  }

  if (!username || typeof username !== "string") {
    return res.status(400).json({ status: "error", error: "Invalid username" });
  }

  const usernameRegex = /^[a-zA-Z0-9_-]+$/; // Example regex for allowed characters
  if (!usernameRegex.test(username)) {
    const allowedCharacters =
      "letters (both uppercase and lowercase), numbers, underscores, and hyphens";
    return res
      .status(400)
      .json({
        status: "error",
        error: `Invalid characters in username. Only ${allowedCharacters} are allowed.`,
      });
  }

  if (username.length < 3 || username.length > 20) {
    return res
      .status(400)
      .json({
        status: "error",
        error: "Username length should be between 3 and 20 characters",
      });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.status(400).json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 8) {
    return res
      .status(400)
      .json({
        status: "error",
        error: "Password should be at least 8 characters",
      });
  }

  // Additional checks for password complexity (e.g., uppercase, lowercase, digits, special characters)
  const passwordComplexityRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/; // this could be used for special characters (?=.*[@$!%*?&])
  if (!passwordComplexityRegex.test(plainTextPassword)) {
    return res
      .status(400)
      .json({
        status: "error",
        error:
          "Password should contain at least one uppercase letter, one lowercase letter and one digit",
      });
  }

  const password = await bcryptjs.hash(plainTextPassword, 10);

  // verify
  const verificationCode = generateSixDigitCode();

  try {
    const response = await User.create({
      username,
      password,
      email,
      fullName: username,
      verified: false,
      verificationCode: verificationCode,
      clubAdmin: false, // Set default value for clubAdmin
      internshipAdmin: false, // Set default value for internshipAdmin
      dateCreated: new Date().toISOString(), // Store the current date/time as ISO string
    });
    sendEmail(
      email,
      "Verification Code",
      `Your six digit verification code is: ${verificationCode}.`
    );

    console.log("User created successfully: ", response);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // Duplicate key
      console.log("username/email in use");
      return res.json({
        status: "error",
        error: "Username or Email already in use",
      });
    }
    throw error;
  }
  return res.json({ status: "ok" });
});

// send a user their applications
router.get("/get-user-applications", async function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    const user_applications = await user_data.get_user_applications(username);

    res.json({
      dataApplications: user_applications,
      tokenUsername: username,
    });
    console.log("applications from", username, "sent");
  } catch (error) {
    console.log(error);
    res.json({
      dataApplications: [],
      tokenUsername: "not logged in",
    });
  }
});

router.get("/get-account", async function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    const user_account = await user_data.get_user_data(username);

    res.json({
      dataAccount: user_account,
      tokenUsername: username,
    });
    console.log("account info for", username, "sent");
  } catch (error) {
    console.log(error);
    res.json({
      dataAccount: [],
      tokenUsername: "not logged in",
    });
  }
});

router.post(
  "/set-account-data",
  upload.single("image"),
  async function (req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const username = decodedToken.username;
      if (req.file) {
        console.log("File:", req.file.originalname);
      }
      user_data.set_user_data(username, req);
      console.log("account info for", username, "updated");
      res.json({ status: "ok" });
    } catch (error) {
      console.log(error);
      res.json({
        dataAccount: [],
        tokenUsername: "not logged in",
      });
      res.json({ status: "error", error: error });
    }
  }
);

router.get("/get-username", async function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;

    res.json({ tokenUsername: username });
  } catch (error) {
    console.log(error);
    res.json({
      tokenUsername: "not logged in",
    });
  }
});

router.get("/get-all-users", async function (req, res) {
  try {
    const users = await user_data.get_all_users();
    res.json({ users: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
});

router.post(
  "/toggle-admin-privileges/:username/:admintype",
  async function (req, res) {
    try {
      user_data.toggle_user_admin(req.params.username, req.params.adminType);
      console.log(
        `${req.params.adminType} has been toggled for ${req.params.username}`
      );
      res.json({ status: "ok" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", error: "Something went wrong" });
    }
  }
);

module.exports = router;
