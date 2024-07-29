const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].part1} exercises={props.parts[0].exercises1} />
      <Part part={props.parts[1].part2} exercises={props.parts[1].exercises2} />
      <Part part={props.parts[2].part3} exercises={props.parts[2].exercises3} />
    </>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.parts[0].exercises1 +
        props.parts[1].exercises2 +
        props.parts[2].exercises3}
    </p>
  )
}

function App() {
  const course = {
    name: "Half Stack application development",

    parts: [
      {
        part1: "Fundamentals of React",
        exercises1: 10,
      },
      {
        part2: "Fundamentals of JS",
        exercises2: 7,
      },
      {
        part3: "Fundamentals of Next",
        exercises3: 14,
      },
    ],
  }

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
