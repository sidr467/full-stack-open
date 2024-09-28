import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import blogService from "../services/blogs"

let blog = {
  id: "1",
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
  user: { name: "Sid" },
}

test("renders content", () => {
  const { container } = render(
    <Blog blog={blog} blogs={[]} setBlogs={vi.fn()} />
  )

  const div = container.querySelector(".blogAuthorTitle")
  expect(div).toHaveTextContent("React patterns -- Michael ChanView")
  expect(div).not.toHaveTextContent("https://reactpatterns.com/")
  expect(div).not.toHaveTextContent("7")
})

test("url and likes onclick view", async () => {
  const { container } = render(
    <Blog blog={blog} blogs={[]} setBlogs={vi.fn()} />
  )

  const user = userEvent.setup()

  const button = screen.getByText("View")
  await user.click(button)

  const div = container.querySelector(".blogDetails")
  expect(div).toHaveTextContent("https://reactpatterns.com/")
  expect(div).toHaveTextContent("7")
})

test("Like button clicked twice", async () => {
  const mockHandler = vi.fn()
  blogService.updateLikes = mockHandler
  render(<Blog blog={blog} blogs={[]} setBlogs={vi.fn()} />)
  const user = userEvent.setup()

  const viewButton = screen.getByText("View")
  await user.click(viewButton)

  const likebtn = screen.getByText("Like")
  await user.click(likebtn)
  await user.click(likebtn)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
