import Part from "./Part"
import Total from "./Total"
import Header from "./Header"

const Content = ({ course }) => {
  console.log(course[0].parts)
  return (
    <>
      {course.map((c) => (
        <div key={c.id}>
          <Header header={c.name} />
          <Part parts={c.parts} />
          <Total parts={c.parts} />
        </div>
      ))}
    </>
  )
}

export default Content
