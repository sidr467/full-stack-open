import Display from "./components/Display"
import Button from "./components/Button"

function App() {
  return (
    <div>
      <div>
        <Display />
        <div>
          <Button type="INC" label="+" />
          <Button type="ZERO" label="0" />
          <Button type="DEC" label="-" />
        </div>
      </div>
    </div>
  )
}

export default App
