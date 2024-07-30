import { useState } from "react"
import Button from "./Button"
import Statistics from "./Statistics"

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + bad + neutral
  const average = ((good - bad) / total).toFixed(1)
  const positive = (100 - ((bad + neutral) / total) * 100).toFixed(2)

  return (
    <>
      <div>
        <h1>Feedbacks</h1>
        <Button onclick={() => setGood(good + 1)} text="good"></Button>
        <Button onclick={() => setNeutral(neutral + 1)} text="neutral"></Button>
        <Button onclick={() => setBad(bad + 1)} text="bad"></Button>
      </div>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        average={average}
        positive={positive}
      />
    </>
  )
}

export default App
