import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"
import { vi } from "vitest"
import blogService from "../services/blogs"

test("calls the createBlog function with the right details", async () => {
  const createBlog = vi.fn().mockResolvedValue({
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  })
  blogService.create = createBlog

  const user = userEvent.setup()

  const { container } = render(
    <BlogForm setBlogs={vi.fn()} setSuccessMsg={vi.fn()} blogs={[]} />
  )

  const titleInput = container.querySelector("#title")
  const authorInput = container.querySelector("#author")
  const urlInput = container.querySelector("#url")
  const createButton = screen.getByText("Create")

  await user.type(titleInput, "React patterns")
  await user.type(authorInput, "Michael Chan")
  await user.type(urlInput, "https://reactpatterns.com/")
  await user.click(createButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  })
})
