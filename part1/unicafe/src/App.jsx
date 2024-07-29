import { useState } from "react"
import Button from "./Button"

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + bad + neutral
  return (
    <>
      <div>
        <h1>Feedbacks</h1>
        <Button onclick={() => setGood(good + 1)} text="good"></Button>
        <Button onclick={() => setNeutral(neutral + 1)} text="neutral"></Button>
        <Button onclick={() => setBad(bad + 1)} text="bad"></Button>
      </div>
      <div>
        <h1>Statstics</h1>
        <p>good {good} </p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {(good - bad) / total}</p>
        <p>Positive {100 - ((bad + neutral) / total) * 100} %</p>
      </div>
    </>
  )
}

export default App
