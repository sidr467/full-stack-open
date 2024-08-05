import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setfilter] = useState("")
  const [show, setShow] = useState(false)

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setCountries(res.data)
      })
  }, [countries])

  const handleShowCountryData = (country) => {
    setShow((prev) => ({
      [country]: !prev[country],
    }))
  }

  const handleFilter = (e) => {
    setfilter(e.target.value)
  }
  const filterCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <div>
        <label htmlFor="filterCountry">Filter countries</label>
        <input
          type="text"
          id="filterCountry"
          value={filter}
          onChange={handleFilter}
        />
      </div>
      <div>
        {filterCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filterCountries.length === 1 ? (
          <div>
            <h1>{filterCountries[0].name.common}</h1>
            <p>capital {filterCountries[0].capital}</p>
            <p>area {filterCountries[0].area}</p>
            <div>
              <h2>Languages</h2>
              <ul>
                {Object.values(filterCountries[0].languages).map(
                  (lang, index) => (
                    <li key={index}>{lang}</li>
                  )
                )}
              </ul>
              <div>
                <img
                  src={filterCountries[0].flags.png}
                  alt={filterCountries[0].flags.alt}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            {filterCountries.map((country) => (
              <div key={country.cca3}>
                <p>
                  {country.name.common}{" "}
                  <button
                    onClick={() => handleShowCountryData(country.name.common)}
                  >
                    Show
                  </button>
                </p>
                {show[country.name.common] && (
                  <div>
                    <h1>{country.name.common}</h1>
                    <p>capital {country.capital}</p>
                    <p>area {country.area}</p>
                    <div>
                      <h2>Languages</h2>
                      <ul>
                        {Object.values(country.languages).map((lang, index) => (
                          <li key={index}>{lang}</li>
                        ))}
                      </ul>
                      <div>
                        <img src={country.flags.png} alt={country.flags.alt} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
