import { useState } from "react"
import Button from "./Button"
import Statistics from "./Statistics"

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + bad + neutral
  console.log(good, bad, neutral, total)
  return (
    <>
      <div>
        <h1>Feedbacks</h1>
        <Button onclick={() => setGood(good + 1)} text="good"></Button>
        <Button onclick={() => setNeutral(neutral + 1)} text="neutral"></Button>
        <Button onclick={() => setBad(bad + 1)} text="bad"></Button>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </>
  )
}

export default App
