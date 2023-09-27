const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

exports.POST = function (user) {
  var hasManagementPrivileges = false;
  if (
    user.clubAdmin ||
    user.eventAdmin ||
    user.volunteeringAdmin ||
    user.internshipAdmin
  ) {
    hasManagementPrivileges = true;
  }
  if (user.servicesEditable && user.servicesEditable.length > 0) {
    hasManagementPrivileges = true;
  }
  if (user.servicesManagable && user.servicesManagable.length > 0) {
    hasManagementPrivileges = true;
  }

  const token = jwt.sign(
    {
      _id: user._id,
      id: user._id, // We need to standardize on one or the other
      username: user.username,
      email: user.email,
      hasManagementPrivileges: hasManagementPrivileges,
      administrator: user.administrator,

      expires: new Date(Date.now() + 10800000), // 3 hours
    },
    JWT_SECRET
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 10800000, // 3 hours
  });

  return token;
};
