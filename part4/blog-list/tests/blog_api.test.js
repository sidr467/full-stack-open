const { test, after, beforeEach, describe } = require("node:test")
const mongoose = require("mongoose")
const assert = require("assert")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helpers")
const Blog = require("../models/blog")

const api = supertest(app)

describe.only("When there is already some Blogs are added", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test.only("Blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("All blogs are returned", async () => {
    const response = await api.get("/api/blogs")
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test("The unique identifier property of the blog posts is by default _id", async () => {
    const blogs = helper.initialBlogs
    assert.ok(blogs[0]._id, "Blog is missing '_id' property")
  })

  describe("Blog adding", () => {
    test("A valid Blog can be added", async () => {
      const initialBlogs = helper.initialBlogs

      const newBlog = {
        title: "Hello test",
        author: "Sid r",
        url: "abdajkdkja",
        likes: 100,
      }

      await api
        .post("/api/blogs")
        .send(newBlog)
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
        .expect(400)
        .expect("Content-Type", /application\/json/)
    })
  })

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map((r) => r.title)
      assert(!titles.includes(blogToDelete.title))
    })
  })

  describe.only("update of blog", () => {
    test.only("Succeed with valid data", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogsToUpdate = blogsAtStart[0]

      const updateBlogData = {
        likes: blogsToUpdate.likes + 1,
      }

      const response = await api
        .put(`/api/blogs/${blogsToUpdate.id}`)
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

// test("dummy returns one", () => {
//   const blogs = []

//   const result = listHelper.dummy(blogs)
//   assert.strictEqual(result, 1)
// })

// describe("total likes", () => {
//   const listWithOneBlog = [
//     {
//       _id: "5a422aa71b54a676234d17f8",
//       title: "Go To Statement Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
//       likes: 5,
//       __v: 0,
//     },
//   ]

//   test("when list has only one blog, equals the likes of that", () => {
//     const result = listHelper.totalLikes(listWithOneBlog)
//     assert.strictEqual(result, 5)
//   })

//   const listWithMultipleBlogs = [
//     {
//       _id: "5a422a851b54a676234d17f7",
//       title: "React patterns",
//       author: "Michael Chan",
//       url: "https://reactpatterns.com/",
//       likes: 7,
//       __v: 0,
//     },
//     {
//       _id: "5a422aa71b54a676234d17f8",
//       title: "Go To Statement Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 5,
//       __v: 0,
//     },
//     {
//       _id: "5a422b3a1b54a676234d17f9",
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//       likes: 12,
//       __v: 0,
//     },
//     {
//       _id: "5a422b891b54a676234d17fa",
//       title: "First class tests",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//       likes: 10,
//       __v: 0,
//     },
//     {
//       _id: "5a422ba71b54a676234d17fb",
//       title: "TDD harms architecture",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//       likes: 0,
//       __v: 0,
//     },
//     {
//       _id: "5a422bc61b54a676234d17fc",
//       title: "Type wars",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//       likes: 2,
//       __v: 0,
//     },
//   ]

//   test("When list has multiple blogs", () => {
//     const result = listHelper.totalLikes(listWithMultipleBlogs)
//     assert.strictEqual(result, 36)
//   })
// })

// describe("favoriteBlog", () => {
//   const listWithMultipleBlogs = [
//     {
//       _id: "5a422a851b54a676234d17f7",
//       title: "React patterns",
//       author: "Michael Chan",
//       url: "https://reactpatterns.com/",
//       likes: 7,
//       __v: 0,
//     },
//     {
//       _id: "5a422aa71b54a676234d17f8",
//       title: "Go To Statement Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 5,
//       __v: 0,
//     },
//     {
//       _id: "5a422b3a1b54a676234d17f9",
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//       likes: 12,
//       __v: 0,
//     },
//     {
//       _id: "5a422b891b54a676234d17fa",
//       title: "First class tests",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//       likes: 10,
//       __v: 0,
//     },
//     {
//       _id: "5a422ba71b54a676234d17fb",
//       title: "TDD harms architecture",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//       likes: 0,
//       __v: 0,
//     },
//     {
//       _id: "5a422bc61b54a676234d17fc",
//       title: "Type wars",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//       likes: 2,
//       __v: 0,
//     },
//   ]

//   test("returns the blog with the most likes", () => {
//     const result = listHelper.favoriteBlog(listWithMultipleBlogs)
//     const expectedBlog = {
//       _id: "5a422b3a1b54a676234d17f9",
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//       likes: 12,
//       __v: 0,
//     }
//     assert.deepStrictEqual(result, expectedBlog)
//   })
// })

// describe("mostBlogs", () => {
//   const listWithMultipleBlogs = [
//     {
//       _id: "5a422a851b54a676234d17f7",
//       title: "React patterns",
//       author: "Michael Chan",
//       url: "https://reactpatterns.com/",
//       likes: 7,
//       __v: 0,
//     },
//     {
//       _id: "5a422aa71b54a676234d17f8",
//       title: "Go To Statement Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 5,
//       __v: 0,
//     },
//     {
//       _id: "5a422b3a1b54a676234d17f9",
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//       likes: 12,
//       __v: 0,
//     },
//     {
//       _id: "5a422b891b54a676234d17fa",
//       title: "First class tests",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//       likes: 10,
//       __v: 0,
//     },
//     {
//       _id: "5a422ba71b54a676234d17fb",
//       title: "TDD harms architecture",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//       likes: 0,
//       __v: 0,
//     },
//     {
//       _id: "5a422bc61b54a676234d17fc",
//       title: "Type wars",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//       likes: 2,
//       __v: 0,
//     },
//   ]

//   test("returns the author with the most blogs and the count", () => {
//     const result = listHelper.mostBlogs(listWithMultipleBlogs)
//     const expected = { author: "Robert C. Martin", numBlogs: 3 }
//     assert.deepStrictEqual(result, expected)
//   })
// })

// describe("mostLikes", () => {
//   const listWithMultipleBlogs = [
//     {
//       _id: "5a422a851b54a676234d17f7",
//       title: "React patterns",
//       author: "Michael Chan",
//       url: "https://reactpatterns.com/",
//       likes: 7,
//       __v: 0,
//     },
//     {
//       _id: "5a422aa71b54a676234d17f8",
//       title: "Go To Statement Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 5,
//       __v: 0,
//     },
//     {
//       _id: "5a422b3a1b54a676234d17f9",
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//       likes: 12,
//       __v: 0,
//     },
//     {
//       _id: "5a422b891b54a676234d17fa",
//       title: "First class tests",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//       likes: 10,
//       __v: 0,
//     },
//     {
//       _id: "5a422ba71b54a676234d17fb",
//       title: "TDD harms architecture",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//       likes: 0,
//       __v: 0,
//     },
//     {
//       _id: "5a422bc61b54a676234d17fc",
//       title: "Type wars",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//       likes: 2,
//       __v: 0,
//     },
//   ]

//   test("returns the author with the most likes and the count", () => {
//     const result = listHelper.mostLikes(listWithMultipleBlogs)
//     const expected = { author: "Edsger W. Dijkstra", likes: 17 }
//     assert.deepStrictEqual(result, expected)
//   })
// })
