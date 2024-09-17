import { useCounterValue } from "../createContext"

const Display = () => {
  const counter = useCounterValue()
  return <div>{counter}</div>
}

export default Display
