const sanitizeHtml = require("sanitize-html");

exports.validateMessage = function (req, res, next) {
  req.body = {
    content: sanitizeHtml(req.body.content.trim()),
    createdAt: new Date(),
    sender: req.body.senderId,
  };
  const messageContent = req.body.content;
  if (typeof messageContent !== "string" || messageContent.length <= 0) {
    console.log("Invalid message body: ", messageContent);
    return res
      .status(400)
      .json({ error: `${messageContent} is an invalid message body` });
  }
  next();
}


exports.authorizeMessage = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const username = decodedToken.username;
    const user_id = decodedToken._id;
    // check if the user owns or manages the service
    const service = await Services.findById(req.body.sender).exec();
    if (!service) {
      console.log('invalid service id');
      return res.status(400).json({ error: "Invalid service ID" });
    }
    if (!service.user === username && !(service.UpdateSenders && service.UpdateSenders.includes(user_id))) {
      console.log('unauthorized');
      return res.status(403).json({ error: "You do not have permission to send a message to this service" });
    }
    next();
  } catch (error) {
    console.error(error);
  }
}