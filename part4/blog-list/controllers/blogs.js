const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (req, res) => {
  // const user = req.user
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  res.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post("/:id/comments", async (req, res) => {
  const { id } = req.params
  const { comment } = req.body

  const blog = await Blog.findById(id)
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" })
  }

  blog.comments = blog.comments.concat(comment) 
  const updatedBlog = await blog.save()

  res.status(201).json(updatedBlog)
})

blogsRouter.post("/", async (req, res, next) => {
  const body = req.body
  const user = req.user

  if (!body.title || !body.url) {
    return res.status(400).json({ error: "title and url requried" })
  }

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

  const populatedBlog = await savedBlog.populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })

  res.status(201).json(populatedBlog.toJSON())
})

blogsRouter.delete("/:id", async (req, res) => {
  const user = req.user
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).json({ error: "blog not found" })
  }

  if (blog.user._id.toString() !== user._id.toString()) {
    return res
      .status(401)
      .json({ error: "unauthorized only creator can delete this blog" })
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put("/:id", async (req, res, next) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user._id,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  }).populate("user", { username: 1, name: 1, id: 1 })

  if (updatedBlog) {
    res.json(updatedBlog.toJSON())
  } else {
    res.status(404).end()
  }
})

module.exports = blogsRouter
