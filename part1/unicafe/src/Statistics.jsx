const Statistics = ({ good, neutral, bad, total }) => {
  return (
    <>
      {total !== 0 ? (
        <div>
          <h1>Statstics</h1>
          <p>good {good} </p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {total}</p>
          <p>average {(good - bad) / total}</p>
          <p>Positive {100 - ((bad + neutral) / total) * 100} %</p>
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
