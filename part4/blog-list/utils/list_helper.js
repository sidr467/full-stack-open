const _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce(
    (max, blog) => (blog.likes > max.likes ? blog : max),
    blogs[0]
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorBlogCount = _.countBy(blogs, "author")

  const maxAuthor = _.maxBy(
    Object.entries(authorBlogCount),
    ([author, numBlogs]) => numBlogs
  )

  return {
    author: maxAuthor[0],
    numBlogs: maxAuthor[1],
  }
}

const mostLikes = (blogs) => {
  const likesByAuthor = _.reduce(
    blogs,
    (result, blog) => {
      if (!result[blog.author]) {
        result[blog.author] = 0
      }
      result[blog.author] += blog.likes
      return result
    },
    {}
  )

  const mostLikedAuthor = _.maxBy(
    Object.keys(likesByAuthor),
    (author) => likesByAuthor[author]
  )

  return {
    author: mostLikedAuthor,
    likes: likesByAuthor[mostLikedAuthor],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
