const JWT_SECRET = process.env.JWT_SECRET;

const login = async function(req, res){
  const usernameOrEmail = req.body.usernameOrEmail;
  const password = req.body.password;
  console.log(usernameOrEmail);
  const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }).lean()
  console.log(user);
  if (!user) {
      return res.status(400).json({ status: 'error', error: 'Invalid username or email/password combination' })
  }

  if(await bcrypt.compare(password, user.password)) {
      // the username, password combination is successful

      const token = jwt.sign(
          { 
              id: user._id, 
              username: user.username,
              email: user.email 
          }, 
          JWT_SECRET
      )

      // set the cookie
      res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 3600000 // 1 hour
      })
      
      req.session.user = {id: user._id, username: user.username, email: user.email };
      res.json({ status: 'ok', data: token })
      
  } else{
      res.status(400).json({ status: 'error', error: 'Invalid username or email/password combination' })
  }
}

module.exports = login;