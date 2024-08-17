const bcrypt = require("bcryptjs")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  })
  res.json(users)
})

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: "Username and Password are required" })
  }

  if (username < 3 || password < 3) {
    return res
      .status(400)
      .json({ error: "Username and Password must be 3 characters long" })
  }

  const saltrounds = 10
  const passwordHash = await bcrypt.hash(password, saltrounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter
