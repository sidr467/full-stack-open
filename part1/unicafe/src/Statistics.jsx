import StatisticLine from "./StatisticLine"

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <>
      {total !== 0 ? (
        <div>
          <h1>Statstics</h1>
          <table>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={positive} />
          </table>
        </div>
      ) : (
        <div>
          <p>No Feedbacks given</p>
        </div>
      )}
    </>
  )
}

export default Statistics
