import { useState } from "react"

const Form = () => {
  const useField = (type) => {
    const [value, setValue] = useState("")

    const onChange = (e) => {
      setValue(e.target.value)
    }

    return {
      type,
      value,
      onChange,
    }
  }

  const name = useField("text")
  const born = useField("date")
  const height = useField("number")

  return (
    <div>
      <form action="">
        name:
        <input {...name} />
        <br />
        <br />
        birthdate:
        <input {...born} />
        <br />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  )
}

export default Form
