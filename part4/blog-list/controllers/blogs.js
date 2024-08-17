const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  res.json(blogs)
})

blogsRouter.post("/", async (req, res, next) => {
  const body = req.body

  if (!body.title || !body.url) {
    return res.status(400).json({ error: "title and url requried" })
  }

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put("/:id", async (req, res, next) => {
  const body = req.body

  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  })

  if (updatedBlog) {
    res.json(updatedBlog.toJSON())
  } else {
    res.status(404).end()
  }
})

module.exports = blogsRouter
