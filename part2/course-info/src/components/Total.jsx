const Total = ({ parts }) => {
  //   let total = 0
  //   parts.forEach((part) => {
  //     total += part.exercises
  //   })

  let total = parts.reduce((a, c) => a + c.exercises, 0)

  return <h3>total of {total} exercises</h3>
}

export default Total
