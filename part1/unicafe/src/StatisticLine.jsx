const StatisticLine = ({ text, value }) => {
  return (
    <>
      {text === "Positive" ? (
        <tr>
          <td>{text} </td>
          <td>{value} %</td>
        </tr>
      ) : (
        <tr>
          <td>{text} </td>
          <td>{value}</td>
        </tr>
      )}
    </>
  )
}

export default StatisticLine
