const { test, expect, beforeEach, describe } = require("@playwright/test")
const { loginWith, createBlog } = require("./helper")

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset")
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Sid",
        username: "sidr",
        password: "abcde",
      },
    })
    await page.goto("http://localhost:5173")
  })

  test("Login form is shown", async ({ page }) => {
    const title = await page.getByText("Login to application")
    await expect(title).toBeVisible()
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible()
  })

  describe("Login", async () => {
    test("Succeed with right credentials", async ({ page }) => {
      await loginWith(page, "sidr", "abcde")
      await expect(page.getByText("sidr loggedIn")).toBeVisible()
    })

    test("Fails with wrong credentials ", async ({ page }) => {
      await loginWith(page, "sidr", "aaknakdn")
      await expect(page.getByText("Wrong credentials")).toBeVisible()
    })
  })

  describe.only("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "sidr", "abcde")
    })

    test("user can create blog", async ({ page }) => {
      await createBlog(page, "new blog", "Sid", "newblog.com")
      await expect(page.getByText("new blog -- Sid")).toBeVisible()
    })

    test("blog can be liked", async ({ page }) => {
      await createBlog(page, "like test", "Sid", "liketest.com")
      await page.getByRole("button", { name: "View" }).click()
      const likespan = page.locator(".likes")

      const initialLikesText = await likespan.textContent()
      const initialLikes = parseInt(initialLikesText, 10)

      await page.getByRole("button", { name: "Like" }).click()
      await page.waitForTimeout(500)

      const updatedLikesText = await likespan.textContent()
      const updatedLikes = parseInt(updatedLikesText, 10)
      expect(updatedLikes).toBe(initialLikes + 1)
    })

    test("A blog can be deleted", async ({ page }) => {
      await createBlog(page, "delete test", "Sid", "deletetest.com")
      await page.getByRole("button", { name: "View" }).click()
      const title = await page.locator(".title").textContent()
      const author = await page.locator(".author").textContent()

      page.on("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm")
        expect(dialog.message()).toBe(`Remove blog ${title} by ${author}`)
        await dialog.accept()
      })

      await page.getByRole("button", { name: "remove" }).click()

      const blog = page.locator("text=delete test")
      await expect(blog).toHaveCount(0)
    })
  })
})
