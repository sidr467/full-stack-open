const Filter = ({filter,handleFilter}) => {
  return (
    <div>
      <label htmlFor="filterCountry">Filter countries</label>
      <input
        type="text"
        id="filterCountry"
        value={filter}
        onChange={handleFilter}
      />
    </div>
  )
}

export default Filter
