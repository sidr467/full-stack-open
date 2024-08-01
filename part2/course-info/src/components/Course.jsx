import Content from "./Content"
import MainHead from "./MainHead"

const Course = ({ course }) => {
  return (
    <div>
      <MainHead />
      <Content course={course} />
    </div>
  )
}

export default Course
