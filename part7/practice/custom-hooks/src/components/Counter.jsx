import { useState } from "react"

const Counter = () => {
  const useCounter = () => {
    const [value, setValue] = useState(0)

    const increase = () => {
      setValue(value + 1)
    }

    const decrease = () => {
      setValue(value - 1)
    }

    const zero = () => {
      setValue(0)
    }

    return {
      zero,
      value,
      increase,
      decrease,
    }
  }

  const counter = useCounter()
  const left = useCounter()
  const right = useCounter()

  return (
    <div>
      <div>
        <div>{counter.value}</div>
        <button onClick={counter.increase}>+</button>
        <button onClick={counter.zero}>0</button>
        <button onClick={counter.decrease}>-</button>
      </div>
      <br />
      <br />
      <div>
        {left.value}
        <button onClick={left.increase}>left</button>
        <br />
        <br />
        {right.value}
        <button onClick={right.increase}>right</button>
      </div>
    </div>
  )
}

export default Counter
