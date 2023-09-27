exports.validateUserData = (req, res, next) => {
    const user = req.body;
    if (
        user._id === undefined ||
        user.id === undefined ||
        user.username === undefined ||
        user.email === undefined ||
        user.hasManagementPrivileges === undefined ||
        user.administrator === undefined
    ) {
        res.status(400).json({ error: "Invalid user data" });
    } else {
        next();
    }
};