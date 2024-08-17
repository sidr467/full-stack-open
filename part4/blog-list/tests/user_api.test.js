const { after, test, describe, beforeEach } = require("node:test")
const assert = require("assert")
const supertest = require("supertest")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const User = require("../models/user")
const app = require("../app")
const helper = require("./test_helpers")

const api = supertest(app)

describe("User api tests user validation", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("secret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test("Creation of valid username and password", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "newuser",
      password: "analkfn",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
