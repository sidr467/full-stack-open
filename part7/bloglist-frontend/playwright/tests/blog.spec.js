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
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "dis",
        username: "disr",
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

  describe("When logged in", () => {
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

    test("Remove button only visible if user have created blog", async ({
      page,
    }) => {
      await createBlog(page, "blog1", "Sid", "blog1.com")
      await page.getByRole("button", { name: "Logout" }).click()
      await loginWith(page, "disr", "abcde")
      await createBlog(page, "blog2", "Sid", "blog2.com")
      await expect(page.getByText("blog2 -- Sid")).toBeVisible()
      await page
        .getByText("blog1 -- Sid")
        .getByRole("button", { name: "View" })
        .click()

      await expect(page.getByRole("button", { name: "remove" })).toHaveCount(0)

      await page
        .getByText("blog2 -- Sid")
        .getByRole("button", { name: "View" })
        .click()

      await expect(page.getByRole("button", { name: "remove" })).toBeVisible()
    })

    test.only("Blogs are sorted by max likes", async ({ page }) => {
      await createBlog(page, "blog1", "Sid", "blog1.com")
      await createBlog(page, "blog2", "Sid", "blog2.com")
      await createBlog(page, "blog3", "Sid", "blog3.com")

      await page.getByRole("button", { name: "View" }).nth(2).click()
      for (let i = 0; i < 2; i++) {
        await page.getByRole("button", { name: "Like" }).click()
        await page.waitForTimeout(500)
      }
      await expect(page.getByText("2", { exact: true })).toBeVisible()
      await page.getByRole("button", { name: "hide" }).click()

      await page.getByRole("button", { name: "View" }).nth(1).click()
      for (let i = 0; i < 1; i++) {
        await page.getByRole("button", { name: "Like" }).click()
        await page.waitForTimeout(500)
      }
      await expect(page.getByText("1", { exact: true })).toBeVisible()
      await page.getByRole("button", { name: "hide" }).click()

      await page.reload()
      await page.waitForTimeout(1000)
      const firstBlogTitle = await page
        .locator(".blogstyle")
        .first()
        .locator(".title")
        .textContent()
      expect(firstBlogTitle.trim()).toBe("blog3")

      const secondBlogTitle = await page
        .locator(".blogstyle")
        .nth(1)
        .locator(".title")
        .textContent()
      expect(secondBlogTitle.trim()).toBe("blog2")

      const thirdBlogTitle = await page
        .locator(".blogstyle")
        .nth(2)
        .locator(".title")
        .textContent()
      expect(thirdBlogTitle.trim()).toBe("blog1")
    })
  })
})
