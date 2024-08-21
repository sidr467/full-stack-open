const { test, after, beforeEach, describe } = require("node:test")
const mongoose = require("mongoose")
const assert = require("assert")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helpers")
const Blog = require("../models/blog")
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const api = supertest(app)

describe("When there is already some Blogs are added", () => {
  let token = ""
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const user = new User({
      username: "admin",
      passwordHash: await bcrypt.hash("secret", 10),
    })

    await user.save()

    const tokenForUser = {
      username: user.username,
      id: user._id,
    }

    token = jwt.sign(tokenForUser, process.env.SECRET)

    await Blog.insertMany(helper.initialBlogs)
  })

  test("Blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("All blogs are returned", async () => {
    const response = await api.get("/api/blogs")
    assert.strictEqual(response.body.length, helper.blogsInDb().length)
  })

  test("The unique identifier property of the blog posts is by default _id", async () => {
    const blogs = helper.initialBlogs
    assert.ok(blogs[0]._id, "Blog is missing '_id' property")
  })

  describe("Blog adding", () => {
    test("A valid Blog can be added", async () => {
      const newBlog = {
        title: "Hello test",
        author: "Sid r",
        url: "abdajkdkja",
        likes: 100,
      }

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const blogsAtEnd = await Blog.find({})
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

      const title = blogsAtEnd.map((blog) => blog.title)
      assert(title.includes(newBlog.title), "new blog missing")
    })
  })

  describe("Adding with missing field", () => {
    test("Blog without likes defaults to 0", async () => {
      const newBlog = {
        title: "No Likes",
        author: "Sid",
        url: "badjakdjk",
      }

      const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      assert.strictEqual(response.body.likes, 0, "likes should be 0")
    })

    test("Blog without title", async () => {
      const newBlog = {
        author: "sid r",
        url: "adnlknad",
        likes: 12,
      }

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(400)
        .expect("Content-Type", /application\/json/)
    })

    test("Blog without url", async () => {
      const newBlog = {
        title: "without url",
        author: "sid r",
        likes: 12,
      }

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(400)
        .expect("Content-Type", /application\/json/)
    })
  })

  describe("deletion of a blog", () => {
    test("a blog can be deleted", async () => {
      const user = await User.findOne({ username: "admin" })
      const tokenforUser = { username: user.username, id: user._id }
      const testToken = jwt.sign(tokenforUser, process.env.SECRET)

      const newBlog = {
        title: "Blog to be deleted",
        author: "Author",
        url: "http://example.com/delete",
        likes: 0,
        user: user._id,
      }

      const createdBlog = await Blog.create(newBlog)

      const blogsAtStart = await Blog.find({})

      const blogToDelete = blogsAtStart.find(
        (blog) => blog.title === "Blog to be deleted"
      )

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${testToken}`)
        .expect(204)

      const blogsAtEnd = await Blog.find({})
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

      const titles = blogsAtEnd.map((blog) => blog.title)
      assert.strictEqual(
        titles.includes(blogToDelete.title),
        false,
        "the title should not be present"
      )
    })
  })

  describe("update of blog", () => {
    test("Succeed with valid data", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogsToUpdate = blogsAtStart[0]

      const updateBlogData = {
        likes: blogsToUpdate.likes + 1,
      }

      const response = await api
        .put(`/api/blogs/${blogsToUpdate.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updateBlogData)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      assert.strictEqual(response.body.likes, blogsToUpdate.likes + 1)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd.find(
        (blog) => blog.id === blogsToUpdate.id
      )

      assert.strictEqual(updatedBlog.likes, updateBlogData.likes)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
