import Weather from "./Weather"

const Country = ({ filteredCountries, handleShowCountryData, show }) => {
  return (
    <div>
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length === 1 ? (
          <div>
            <h1>{filteredCountries[0].name.common}</h1>
            <p>Capital: {filteredCountries[0].capital}</p>
            <p>Area: {filteredCountries[0].area}</p>
            <div>
              <h2>Languages</h2>
              <ul>
                {Object.values(filteredCountries[0].languages).map(
                  (lang, index) => (
                    <li key={index}>{lang}</li>
                  )
                )}
              </ul>
              <div>
                <img
                  src={filteredCountries[0].flags.png}
                  alt={filteredCountries[0].flags.alt}
                />
              </div>
              <Weather capital={filteredCountries[0].capital[0]} />
            </div>
          </div>
        ) : (
          <div>
            {filteredCountries.map((country) => (
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
                    <p>Capital: {country.capital}</p>
                    <p>Area: {country.area}</p>
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
                      <Weather capital={country.capital[0]} />
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

export default Country
