import { useEffect, useState } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import Country from "./components/Country"

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [show, setShow] = useState({})

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setCountries(res.data)
      })
  }, [])

  const handleShowCountryData = (country) => {
    setShow((prev) => ({
      ...prev,
      [country]: !prev[country],
    }))
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <Filter handleFilter={handleFilter} filter={filter} />
      <Country
        handleShowCountryData={handleShowCountryData}
        filteredCountries={filteredCountries}
        show={show}
      />
    </div>
  )
}

export default App
